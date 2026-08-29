"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AlertTriangle, Film, Loader2, Pencil, Play, Plus, Search, Ticket, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const STATUSES = [
  { name: "unwatched", displayName: "Unwatched", variant: "secondary" },
  { name: "watching", displayName: "Watching", variant: "warning" },
  { name: "watched", displayName: "Watched", variant: "success" },
];

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]";

function statusVariant(status) {
  return STATUSES.find((s) => s.name === status)?.variant ?? "secondary";
}

function statusLabel(status) {
  return STATUSES.find((s) => s.name === status)?.displayName ?? status;
}

function TogglePill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

// Cleans up commonly-pasted URL patterns before saving: strips YouTube's
// tracking param from trailer links, and upsizes a common poster-image size
// pattern to something bigger.
function repairFormData(formData) {
  const trailerParamIndex = formData.trailer_url?.indexOf("&pp=") ?? -1;
  return {
    ...formData,
    trailer_url:
      trailerParamIndex === -1 ? formData.trailer_url : formData.trailer_url.slice(0, trailerParamIndex),
    img_url: formData.img_url?.replace("/200/0/", "/400/600/") ?? formData.img_url,
  };
}

function MovieForm({ formData, setFormData }) {
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData?.name ?? ""} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData?.status ?? "unwatched"}
            onChange={handleChange}
            className={selectClassName}
          >
            {STATUSES.map((status) => (
              <option key={status.name} value={status.name}>
                {status.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="release_date">Release date</Label>
          <Input
            id="release_date"
            name="release_date"
            type="date"
            value={formData?.release_date ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {formData?.img_url?.includes("/200/0/") && (
        <p className="flex items-center gap-1.5 rounded-md border border-amber-500/50 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="size-3.5 shrink-0" />
          Image URL will replace "/200/0/" with "/400/600/" on save.
        </p>
      )}
      <div className="grid gap-1.5">
        <Label htmlFor="img_url">Image URL</Label>
        <Input id="img_url" name="img_url" value={formData?.img_url ?? ""} onChange={handleChange} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="detail_url">Detail URL</Label>
        <Input id="detail_url" name="detail_url" value={formData?.detail_url ?? ""} onChange={handleChange} />
      </div>

      {formData?.trailer_url?.includes("&pp=") && (
        <p className="flex items-center gap-1.5 rounded-md border border-amber-500/50 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="size-3.5 shrink-0" />
          Trailer URL will truncate the tracking param on save.
        </p>
      )}
      <div className="grid gap-1.5">
        <Label htmlFor="trailer_url">Trailer URL</Label>
        <Input id="trailer_url" name="trailer_url" value={formData?.trailer_url ?? ""} onChange={handleChange} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData?.notes ?? ""}
          placeholder="Add notes..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function TrailerDialog({ movie, open, onOpenChange }) {
  if (!movie) return null;

  const embedUrl = movie.trailer_url ? `https://youtube.com/embed/${movie.trailer_url.slice(32)}` : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{movie.name}</DialogTitle>
        </DialogHeader>

        {embedUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
            <iframe src={embedUrl} className="h-full w-full" allowFullScreen />
          </div>
        ) : (
          <div className="bg-muted flex aspect-video w-full items-center justify-center rounded-md">
            <p className="text-muted-foreground text-sm">No trailer yet.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MovieCard({ movie, isAdmin, onView, onEdit, onDelete }) {
  const unreleased = new Date(movie.release_date) > new Date();
  const badge = unreleased
    ? { variant: "destructive", label: "Unreleased" }
    : movie.status === "watched"
      ? { variant: "success", label: "Watched" }
      : movie.status === "watching"
        ? { variant: "warning", label: "Watching" }
        : null;
  const isFandango = movie.detail_url?.includes("fandango");

  return (
    <div className="flex flex-col">
      <div className="group relative aspect-2/3 w-full overflow-hidden rounded-lg bg-neutral-800">
        <button type="button" onClick={onView} className="absolute inset-0 cursor-pointer" aria-label={`View ${movie.name}`}>
          {movie.img_url && (
            // eslint-disable-next-line @next/next/no-img-element -- external poster URL
            <img
              src={movie.img_url}
              alt={movie.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
            <Play className="size-10 fill-white text-white drop-shadow" />
          </div>
        </button>

        {badge && (
          <Badge variant={badge.variant} className="pointer-events-none absolute top-2 left-2 shadow">
            {badge.label}
          </Badge>
        )}

        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button type="button" size="icon" variant="secondary" className="size-7" onClick={onEdit} aria-label="Edit movie">
              <Pencil className="size-3.5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="size-7"
              onClick={onDelete}
              aria-label="Delete movie"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-0.5">
        <a
          href={movie.detail_url || undefined}
          target={movie.detail_url ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={cn("text-foreground text-sm font-medium", movie.detail_url && "hover:underline")}
        >
          {movie.name}
        </a>
        <p className="text-muted-foreground text-xs">
          {new Date(movie.release_date).toLocaleDateString("en-US", { timeZone: "UTC" })}
        </p>

        {movie.detail_url && (
          <a
            href={movie.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground mt-1 inline-flex items-center gap-1 text-xs font-medium"
          >
            {isFandango ? <Ticket className="size-3" /> : <Film className="size-3" />}
            {isFandango ? "Tickets" : "Stream"}
          </a>
        )}

        {movie.notes && <p className="text-muted-foreground mt-1 text-xs italic">{movie.notes}</p>}
      </div>
    </div>
  );
}

export default function Watchlist({ watchlist: initialWatchlist }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [fetchFailed, setFetchFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchlist, setWatchlist] = useState(initialWatchlist ?? []);
  const [formData, setFormData] = useState({});
  const [query, setQuery] = useState("");
  const [activeStatuses, setActiveStatuses] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const hasActiveFilters = query || activeStatuses.length > 0;

  function clearFilters() {
    setQuery("");
    setActiveStatuses([]);
  }

  const filteredWatchlist = watchlist
    .filter((movie) => activeStatuses.length === 0 || activeStatuses.includes(movie.status))
    .filter((movie) => movie.name?.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  async function handleCreateMovie(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(repairFormData(formData)),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setWatchlist((prev) => [...prev, newMovie]);
        setCreateOpen(false);
      } else {
        setFetchFailed(true);
      }
    } catch {
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateMovie(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(repairFormData(formData)),
      });

      if (response.ok) {
        const updatedMovie = await response.json();
        setWatchlist((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
        setUpdateOpen(false);
      } else {
        setFetchFailed(true);
      }
    } catch {
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteMovie(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/watchlist?id=${formData.id}`, { method: "DELETE" });

      if (response.ok) {
        setWatchlist((prev) => prev.filter((m) => m.id !== formData.id));
        setDeleteOpen(false);
      } else {
        setFetchFailed(true);
      }
    } catch {
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function openCreate() {
    setFormData({
      name: "",
      status: "unwatched",
      release_date: "",
      img_url: "",
      trailer_url: "",
      detail_url: "",
      notes: "",
    });
    setCreateOpen(true);
  }

  function openView(movie) {
    setFormData(movie);
    setViewOpen(true);
  }

  function openEdit(movie) {
    setFormData(movie);
    setViewOpen(false);
    setUpdateOpen(true);
  }

  function openDelete(movie) {
    setFormData(movie);
    setViewOpen(false);
    setDeleteOpen(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      {fetchFailed && (
        <div className="border-destructive/50 bg-destructive/10 text-destructive mb-4 flex items-center gap-2 rounded-md border px-4 py-3 text-sm">
          <AlertTriangle className="size-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="pl-9"
          />
        </div>

        {STATUSES.map((status) => (
          <TogglePill
            key={status.name}
            active={activeStatuses.includes(status.name)}
            onClick={() => toggle(activeStatuses, setActiveStatuses, status.name)}
          >
            {status.displayName}
          </TogglePill>
        ))}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium"
          >
            <X className="size-3" />
            Clear
          </button>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {filteredWatchlist.length} title{filteredWatchlist.length === 1 ? "" : "s"}
        </p>

        {isAdmin && (
          <Button type="button" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Add movie
          </Button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredWatchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isAdmin={isAdmin}
            onView={() => openView(movie)}
            onEdit={() => openEdit(movie)}
            onDelete={() => openDelete(movie)}
          />
        ))}
      </div>

      {filteredWatchlist.length === 0 && (
        <p className="text-muted-foreground mt-12 text-center text-sm">No titles match your filters.</p>
      )}

      <TrailerDialog movie={formData?.id ? formData : null} open={viewOpen} onOpenChange={setViewOpen} />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add movie</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateMovie} className="grid gap-4">
            <MovieForm formData={formData} setFormData={setFormData} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                Close
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit movie</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateMovie} className="grid gap-4">
            <MovieForm formData={formData} setFormData={setFormData} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUpdateOpen(false)}>
                Close
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete movie</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeleteMovie}>
            <p className="text-muted-foreground text-sm">
              Are you sure you want to delete &quot;{formData.name}&quot;? This action cannot be undone.
            </p>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setDeleteOpen(false)}>
                Close
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
