import { NextResponse } from "next/server";

import {
  JOURNAL_BUCKET,
  JOURNAL_TABLE,
  getJournalClient,
  isAdminUser,
  uploadJournalImages,
  withSignedImages,
} from "@/lib/journal";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Validates the shared entry fields from a multipart form. Returns either
// { fields } or { error }.
function parseEntryFields(formData) {
  const start_date = formData.get("start_date") || "";
  const end_date = formData.get("end_date") || null;
  const description = formData.get("description") ?? "";

  if (!DATE_PATTERN.test(start_date)) return { error: "A valid start date is required" };
  if (end_date && !DATE_PATTERN.test(end_date)) return { error: "End date is invalid" };
  if (end_date && end_date < start_date) return { error: "End date must be on or after the start date" };

  return { fields: { start_date, end_date, description } };
}

function getImageFiles(formData) {
  return formData.getAll("images").filter((file) => typeof file === "object" && file.size > 0);
}

export async function POST(request) {
  if (!(await isAdminUser())) return forbidden();

  try {
    const formData = await request.formData();
    const { fields, error: validationError } = parseEntryFields(formData);
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const supabase = getJournalClient();
    const images = await uploadJournalImages(supabase, getImageFiles(formData));

    const { data, error } = await supabase
      .from(JOURNAL_TABLE)
      .insert({ ...fields, images })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      if (images.length > 0) await supabase.storage.from(JOURNAL_BUCKET).remove(images);
      return NextResponse.json({ error: "Failed to create entry" }, { status: 500 });
    }

    const [entry] = await withSignedImages(supabase, [data]);
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await isAdminUser())) return forbidden();

  try {
    const formData = await request.formData();
    const id = formData.get("id");
    if (!id) return NextResponse.json({ error: "Entry ID is required" }, { status: 400 });

    const { fields, error: validationError } = parseEntryFields(formData);
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const supabase = getJournalClient();
    const { data: existing, error: fetchError } = await supabase
      .from(JOURNAL_TABLE)
      .select("images")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Supabase select error:", fetchError);
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    // Only keep paths that already belong to this entry, so a client can't
    // attach someone else's storage objects.
    const existingImages = existing.images ?? [];
    const requestedKeep = JSON.parse(formData.get("keep_images") || "[]");
    const keptImages = existingImages.filter((path) => requestedKeep.includes(path));
    const removedImages = existingImages.filter((path) => !keptImages.includes(path));

    const newImages = await uploadJournalImages(supabase, getImageFiles(formData));

    const { data, error } = await supabase
      .from(JOURNAL_TABLE)
      .update({ ...fields, images: [...keptImages, ...newImages] })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      if (newImages.length > 0) await supabase.storage.from(JOURNAL_BUCKET).remove(newImages);
      return NextResponse.json({ error: "Failed to update entry" }, { status: 500 });
    }

    if (removedImages.length > 0) {
      const { error: removeError } = await supabase.storage.from(JOURNAL_BUCKET).remove(removedImages);
      if (removeError) console.error("Supabase storage remove error:", removeError);
    }

    const [entry] = await withSignedImages(supabase, [data]);
    return NextResponse.json(entry);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAdminUser())) return forbidden();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Entry ID is required" }, { status: 400 });

    const supabase = getJournalClient();
    const { data, error } = await supabase.from(JOURNAL_TABLE).delete().eq("id", id).select().single();

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 });
    }

    if (data.images?.length > 0) {
      const { error: removeError } = await supabase.storage.from(JOURNAL_BUCKET).remove(data.images);
      if (removeError) console.error("Supabase storage remove error:", removeError);
    }

    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
