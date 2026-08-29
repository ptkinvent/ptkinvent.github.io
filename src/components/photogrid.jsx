"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Masonry } from "masonic";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function formatDate(taken_at) {
  return taken_at ? new Date(taken_at).toLocaleDateString() : "";
}

function PhotoTile({ data }) {
  return (
    <button
      type="button"
      onClick={data.onSelect}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg bg-neutral-800"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage URL, not a static import */}
      <img
        src={data.path}
        alt={data.caption || ""}
        className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
      />

      {(data.caption || data.taken_at) && (
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {data.caption && <p className="text-sm font-medium text-white">{data.caption}</p>}
          {data.taken_at && <p className="text-xs text-white/70">{formatDate(data.taken_at)}</p>}
        </div>
      )}
    </button>
  );
}

function PhotoLightbox({ photos, index, setIndex, isAdmin, open, onOpenChange, onEdit, onDelete }) {
  const photo = index != null ? photos[index] : null;

  useEffect(() => {
    if (!open || photos.length < 2) return;

    function handleKeyDown(e) {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, photos.length, setIndex]);

  if (!photo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border max-w-3xl gap-0 overflow-hidden p-0">
        <div className="relative flex items-center justify-center bg-black">
          <div className="absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black/50 to-transparent" />
          {/* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage URL, not a static import */}
          <img src={photo.path} alt={photo.caption || ""} className="max-h-[75vh] w-full object-contain" />

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % photos.length)}
                className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Next photo"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 p-4">
          <div className="min-w-0">
            <DialogTitle className={cn("text-foreground font-medium", !photo.caption && "sr-only")}>
              {photo.caption || "Photo"}
            </DialogTitle>
            {photo.taken_at && <p className="text-muted-foreground text-sm">{formatDate(photo.taken_at)}</p>}
          </div>

          {isAdmin && (
            <div className="flex shrink-0 gap-2">
              <Button type="button" size="icon" variant="outline" onClick={onEdit} aria-label="Edit photo">
                <Pencil className="size-4" />
              </Button>
              <Button type="button" size="icon" variant="destructive" onClick={onDelete} aria-label="Delete photo">
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PhotoForm({ formData, setFormData, mode }) {
  function handleChange(e) {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="grid gap-4">
      {mode === "create" ? (
        <div className="grid gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input id="image" name="image" type="file" accept="image/*" onChange={handleChange} required />
        </div>
      ) : (
        formData?.path && (
          // eslint-disable-next-line @next/next/no-img-element -- Supabase Storage URL, not a static import
          <img src={formData.path} alt={formData.caption || ""} className="border-border w-full rounded-md border" />
        )
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="caption">Caption</Label>
        <Textarea
          id="caption"
          name="caption"
          value={formData?.caption ?? ""}
          placeholder="Add caption..."
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="taken_at">Date taken</Label>
        <Input id="taken_at" name="taken_at" type="date" value={formData?.taken_at ?? ""} onChange={handleChange} />
      </div>
    </div>
  );
}

export default function PhotoGrid() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [isClient, setIsClient] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({});
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);

    fetch("/api/photography")
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch(() => setFetchFailed(true));
  }, []);

  const sortedPhotos = [...photos].sort((a, b) => new Date(b.taken_at) - new Date(a.taken_at));

  async function handleCreatePhoto(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const body = new FormData();
      body.append("image", formData.image);
      body.append("caption", formData.caption ?? "");
      body.append("taken_at", formData.taken_at ?? "");

      const response = await fetch("/api/photography", { method: "POST", body });

      if (response.ok) {
        const newPhoto = await response.json();
        setPhotos((prev) => [...prev, newPhoto]);
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

  async function handleUpdatePhoto(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/photography", {
        method: "PATCH",
        body: JSON.stringify({ id: formData.id, caption: formData.caption, taken_at: formData.taken_at }),
      });

      if (response.ok) {
        const updatedPhoto = await response.json();
        setPhotos((prev) => prev.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p)));
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

  async function handleDeletePhoto(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/photography?id=${formData.id}`, { method: "DELETE" });

      if (response.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== formData.id));
        setDeleteOpen(false);
        setLightboxOpen(false);
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
    setFormData({ image: null, caption: "", taken_at: new Date().toISOString().split("T")[0] });
    setCreateOpen(true);
  }

  function openEdit(photo) {
    setFormData({ ...photo, taken_at: photo.taken_at ? new Date(photo.taken_at).toISOString().split("T")[0] : "" });
    setLightboxOpen(false);
    setUpdateOpen(true);
  }

  function openDelete(photo) {
    setFormData(photo);
    setLightboxOpen(false);
    setDeleteOpen(true);
  }

  if (!isClient) {
    return <p className="text-muted-foreground mx-auto max-w-5xl px-4 py-12 text-center text-sm sm:px-6">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      {fetchFailed && (
        <div className="border-destructive/50 bg-destructive/10 text-destructive mb-4 flex items-center gap-2 rounded-md border px-4 py-3 text-sm">
          <AlertTriangle className="size-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      {isAdmin && (
        <Button type="button" size="sm" onClick={openCreate} className="mb-4">
          <Plus className="size-4" />
          Add photo
        </Button>
      )}

      <Masonry
        key={sortedPhotos.length}
        items={sortedPhotos.map((photo, i) => ({
          ...photo,
          onSelect: () => {
            setLightboxIndex(i);
            setLightboxOpen(true);
          },
        }))}
        render={PhotoTile}
        maxColumnCount={3}
        columnGutter={16}
      />

      <PhotoLightbox
        photos={sortedPhotos}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        isAdmin={isAdmin}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onEdit={() => openEdit(sortedPhotos[lightboxIndex])}
        onDelete={() => openDelete(sortedPhotos[lightboxIndex])}
      />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePhoto} className="grid gap-4">
            <PhotoForm formData={formData} setFormData={setFormData} mode="create" />
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
            <DialogTitle>Edit photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePhoto} className="grid gap-4">
            <PhotoForm formData={formData} setFormData={setFormData} mode="update" />
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
            <DialogTitle>Delete photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeletePhoto}>
            <p className="text-muted-foreground text-sm">
              Are you sure you want to delete this photo? This action cannot be undone.
            </p>
            {formData.path && (
              // eslint-disable-next-line @next/next/no-img-element -- Supabase Storage URL, not a static import
              <img
                src={formData.path}
                alt={formData.caption || ""}
                className="border-border mt-3 w-full rounded-md border"
              />
            )}
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
