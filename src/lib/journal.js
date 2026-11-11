import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const JOURNAL_TABLE = "journal";
export const JOURNAL_BUCKET = "journal";

// Signed image URLs are short-lived because the journal bucket is private.
const SIGNED_URL_TTL_SECONDS = 60 * 60;

export async function isAdminUser() {
  const user = await currentUser();
  return user?.publicMetadata?.role === "admin";
}

// The journal is private, so it must use the service role key (never the anon
// key) and the table/bucket should have RLS enabled with no public policies.
export function getJournalClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for the journal");
  }
  return createClient(supabaseUrl, supabaseKey);
}

// Replaces each entry's stored image paths with { path, url } objects that the
// browser can render.
export async function withSignedImages(supabase, entries) {
  const paths = entries.flatMap((entry) => entry.images ?? []);
  if (paths.length === 0) {
    return entries.map((entry) => ({ ...entry, images: [] }));
  }

  const { data, error } = await supabase.storage.from(JOURNAL_BUCKET).createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
  if (error) throw error;

  const urlByPath = Object.fromEntries(data.map((item) => [item.path, item.signedUrl]));
  return entries.map((entry) => ({
    ...entry,
    images: (entry.images ?? []).map((path) => ({ path, url: urlByPath[path] ?? null })),
  }));
}

export async function uploadJournalImages(supabase, files) {
  const paths = [];
  for (const file of files) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from(JOURNAL_BUCKET).upload(path, file, { contentType: file.type });
    if (error) {
      if (paths.length > 0) await supabase.storage.from(JOURNAL_BUCKET).remove(paths);
      throw error;
    }
    paths.push(path);
  }
  return paths;
}
