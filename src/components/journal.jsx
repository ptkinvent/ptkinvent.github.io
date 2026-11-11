"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, CalendarDays, ImageIcon, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Dates are stored as plain "YYYY-MM-DD" strings, so format them in UTC to
// avoid off-by-one shifts from the viewer's timezone.
function formatDate(date, options = { month: "short", day: "numeric", year: "numeric" }) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...options });
}

function formatRange(entry) {
  if (!entry.end_date || entry.end_date === entry.start_date) return formatDate(entry.start_date);
  return `${formatDate(entry.start_date)} – ${formatDate(entry.end_date)}`;
}

function todayString() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// A rough plain-text preview of the first meaningful line of markdown.
function previewText(markdown) {
  const line = (markdown ?? "")
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("!["));
  if (!line) return "Untitled entry";
  return line
    .replace(/^(#+|>|[-*+]|\d+\.)\s*/, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "");
}

function sortEntries(entries) {
  return [...entries].sort(
    (a, b) => b.start_date.localeCompare(a.start_date) || (b.created_at ?? "").localeCompare(a.created_at ?? "")
  );
}

function TodayMarker({ markerRef, today }) {
  return (
    <div ref={markerRef} className="relative flex items-center gap-3 py-3 pl-1">
      <span className="relative z-10 flex size-3.5 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-500/40" />
        <span className="relative size-3 rounded-full bg-sky-500 ring-4 ring-sky-500/20" />
      </span>
      <span className="text-xs font-semibold tracking-wider text-sky-600 uppercase dark:text-sky-400">Today</span>
      <span className="text-muted-foreground text-xs">{formatDate(today)}</span>
    </div>
  );
}

function MonthHeading({ month }) {
  return (
    <div className="bg-background/95 sticky top-0 z-20 -mx-4 px-4 pt-6 pb-2 backdrop-blur">
      <h2 className="font-display text-muted-foreground pl-7 text-sm font-medium tracking-wide">
        {formatDate(`${month}-01`, { month: "long", year: "numeric" })}
      </h2>
    </div>
  );
}

function TimelineEvent({ entry, selected, onSelect }) {
  const isRange = entry.end_date && entry.end_date !== entry.start_date;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex w-full gap-3 rounded-lg py-2 pr-3 pl-1 text-left transition-colors",
        selected ? "bg-accent" : "hover:bg-accent/60"
      )}
    >
      <span className="relative z-10 mt-1.5 flex size-3.5 shrink-0 items-center justify-center">
        <span
          className={cn(
            "size-2.5 rounded-full border-2 transition-colors",
            selected
              ? "border-foreground bg-foreground"
              : "border-muted-foreground/60 bg-background group-hover:border-foreground"
          )}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          {isRange && <CalendarDays className="size-3" />}
          {formatRange(entry)}
        </span>
        <span className="text-foreground mt-0.5 block truncate text-sm font-medium">
          {previewText(entry.description)}
        </span>
        {entry.images?.length > 0 && (
          <span className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
            <ImageIcon className="size-3" />
            {entry.images.length}
          </span>
        )}
      </span>
    </button>
  );
}

function Timeline({ entries, selectedId, onSelect }) {
  const today = todayString();
  const todayRef = useRef(null);

  // Load the timeline at "today" (normally the very top, unless there are
  // future-dated entries above it).
  useEffect(() => {
    todayRef.current?.scrollIntoView({ block: "start" });
  }, []);

  const future = entries.filter((e) => e.start_date > today);
  const past = entries.filter((e) => e.start_date <= today);

  const months = [];
  for (const entry of past) {
    const month = entry.start_date.slice(0, 7);
    if (months.at(-1)?.month !== month) months.push({ month, entries: [] });
    months.at(-1).entries.push(entry);
  }

  return (
    <div className="relative px-4 pb-24">
      {/* The vertical spine of the timeline, aligned with the event dots. */}
      <div className="bg-border absolute top-0 bottom-0 left-[1.6875rem] w-px" />

      {future.length > 0 && (
        <div className="pt-4">
          <p className="text-muted-foreground pb-2 pl-7 text-xs font-medium tracking-wider uppercase">Upcoming</p>
          {future.map((entry) => (
            <TimelineEvent
              key={entry.id}
              entry={entry}
              selected={entry.id === selectedId}
              onSelect={() => onSelect(entry.id)}
            />
          ))}
        </div>
      )}

      <TodayMarker markerRef={todayRef} today={today} />

      {months.map(({ month, entries: monthEntries }) => (
        <section key={month}>
          <MonthHeading month={month} />
          {monthEntries.map((entry) => (
            <TimelineEvent
              key={entry.id}
              entry={entry}
              selected={entry.id === selectedId}
              onSelect={() => onSelect(entry.id)}
            />
          ))}
        </section>
      ))}

      {entries.length === 0 && (
        <p className="text-muted-foreground py-8 pl-7 text-sm">No entries yet. Add your first one above.</p>
      )}
    </div>
  );
}

function EntryDetail({ entry, onEdit, onDelete }) {
  if (!entry) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
        Select an entry from the timeline to read it.
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-10 py-10">
      <div className="flex items-start justify-between gap-4">
        <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <CalendarDays className="size-4" />
          {formatRange(entry)}
        </p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onDelete} className="text-destructive">
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
        {entry.description ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.description}</ReactMarkdown>
        ) : (
          <p className="text-muted-foreground italic">No description.</p>
        )}
      </div>

      {entry.images?.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          {entry.images.map((image) => (
            <a
              key={image.path}
              href={image.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-lg bg-neutral-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- signed Supabase Storage URL */}
              <img
                src={image.url ?? undefined}
                alt=""
                className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function EntryForm({ formData, setFormData }) {
  const newFilePreviews = useMemo(
    () => (formData.newFiles ?? []).map((file) => ({ file, url: URL.createObjectURL(file) })),
    [formData.newFiles]
  );

  useEffect(() => () => newFilePreviews.forEach((p) => URL.revokeObjectURL(p.url)), [newFilePreviews]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files ?? []);
    setFormData({ ...formData, newFiles: [...(formData.newFiles ?? []), ...files] });
    e.target.value = "";
  }

  function removeExisting(path) {
    setFormData({ ...formData, images: formData.images.filter((image) => image.path !== path) });
  }

  function removeNew(file) {
    setFormData({ ...formData, newFiles: formData.newFiles.filter((f) => f !== file) });
  }

  const thumbnails = [
    ...(formData.images ?? []).map((image) => ({ key: image.path, url: image.url, onRemove: () => removeExisting(image.path) })),
    ...newFilePreviews.map(({ file, url }) => ({ key: url, url, onRemove: () => removeNew(file) })),
  ];

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="start_date">Start date</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            required
            value={formData.start_date ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="end_date">End date (optional)</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            min={formData.start_date || undefined}
            value={formData.end_date ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">Description (markdown)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description ?? ""}
          placeholder="What happened?"
          onChange={handleChange}
          className="min-h-48 font-mono text-sm"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="images">Images</Label>
        <Input id="images" type="file" accept="image/*" multiple onChange={handleFiles} />
        {thumbnails.length > 0 && (
          <div className="mt-1 grid grid-cols-4 gap-2">
            {thumbnails.map((thumb) => (
              <div key={thumb.key} className="group relative aspect-square overflow-hidden rounded-md bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element -- local preview / signed URL */}
                <img src={thumb.url ?? undefined} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={thumb.onRemove}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function buildRequestBody(formData) {
  const body = new FormData();
  if (formData.id) body.append("id", formData.id);
  body.append("start_date", formData.start_date ?? "");
  body.append("end_date", formData.end_date ?? "");
  body.append("description", formData.description ?? "");
  body.append("keep_images", JSON.stringify((formData.images ?? []).map((image) => image.path)));
  for (const file of formData.newFiles ?? []) body.append("images", file);
  return body;
}

export default function Journal({ entries: initialEntries, loadFailed }) {
  const [entries, setEntries] = useState(() => sortEntries(initialEntries ?? []));
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(loadFailed ? "Failed to load journal entries." : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const selectedEntry = entries.find((entry) => entry.id === selectedId) ?? null;

  async function submit(request, onSuccess) {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const response = await request();
      if (response.ok) {
        await onSuccess(response);
      } else {
        const { error } = await response.json().catch(() => ({}));
        setErrorMessage(error || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCreate(e) {
    e.preventDefault();
    submit(
      () => fetch("/api/journal", { method: "POST", body: buildRequestBody(formData) }),
      async (response) => {
        const entry = await response.json();
        setEntries((prev) => sortEntries([...prev, entry]));
        setSelectedId(entry.id);
        setCreateOpen(false);
      }
    );
  }

  function handleUpdate(e) {
    e.preventDefault();
    submit(
      () => fetch("/api/journal", { method: "PATCH", body: buildRequestBody(formData) }),
      async (response) => {
        const entry = await response.json();
        setEntries((prev) => sortEntries(prev.map((x) => (x.id === entry.id ? entry : x))));
        setUpdateOpen(false);
      }
    );
  }

  function handleDelete(e) {
    e.preventDefault();
    submit(
      () => fetch(`/api/journal?id=${formData.id}`, { method: "DELETE" }),
      async () => {
        setEntries((prev) => prev.filter((x) => x.id !== formData.id));
        setSelectedId(null);
        setDeleteOpen(false);
      }
    );
  }

  function openCreate() {
    setFormData({ start_date: todayString(), end_date: "", description: "", images: [], newFiles: [] });
    setCreateOpen(true);
  }

  function openEdit() {
    setFormData({ ...selectedEntry, end_date: selectedEntry.end_date ?? "", newFiles: [] });
    setUpdateOpen(true);
  }

  function openDelete() {
    setFormData(selectedEntry);
    setDeleteOpen(true);
  }

  function dialogFooter(onClose, label, pendingLabel, variant) {
    return (
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" variant={variant} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? pendingLabel : label}
        </Button>
      </DialogFooter>
    );
  }

  return (
    <div className="flex h-[calc(100vh-70px)] overflow-hidden">
      <aside className="border-border flex w-96 shrink-0 flex-col border-r">
        <div className="border-border flex items-center justify-between border-b px-4 py-3">
          <h1 className="font-display text-xl font-light tracking-wide">Journal</h1>
          <Button type="button" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Add entry
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Timeline entries={entries} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {errorMessage && (
          <div className="border-destructive/50 bg-destructive/10 text-destructive m-4 flex items-center gap-2 rounded-md border px-4 py-3 text-sm">
            <AlertTriangle className="size-4 shrink-0" />
            {errorMessage}
          </div>
        )}
        <EntryDetail entry={selectedEntry} onEdit={openEdit} onDelete={openDelete} />
      </main>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="grid gap-4">
            <EntryForm formData={formData} setFormData={setFormData} />
            {dialogFooter(() => setCreateOpen(false), "Create", "Creating...")}
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="grid gap-4">
            <EntryForm formData={formData} setFormData={setFormData} />
            {dialogFooter(() => setUpdateOpen(false), "Save", "Saving...")}
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDelete} className="grid gap-4">
            <p className="text-muted-foreground text-sm">
              Are you sure you want to delete the entry from {formData.start_date && formatRange(formData)}? Its
              images will be deleted too. This action cannot be undone.
            </p>
            {dialogFooter(() => setDeleteOpen(false), "Delete", "Deleting...", "destructive")}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
