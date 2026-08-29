"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const STATUSES = [
  { name: "unvisited", displayName: "Unvisited", variant: "secondary" },
  { name: "visited", displayName: "Visited", variant: "success" },
  { name: "closed", displayName: "Closed", variant: "destructive" },
];

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]";

function statusVariant(status) {
  return STATUSES.find((s) => s.name === status)?.variant ?? "secondary";
}

function statusLabel(status) {
  return STATUSES.find((s) => s.name === status)?.displayName ?? status;
}

// Cuisines are stored as a single comma-separated string in the `cuisine` column
// (e.g. "Indian, Fusion") so multi-tag support doesn't require a schema change.
function parseCuisines(cuisine) {
  return (cuisine ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
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

function RestaurantForm({ formData, setFormData, cities }) {
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
          <Label htmlFor="city">City</Label>
          <select id="city" name="city" value={formData?.city ?? ""} onChange={handleChange} className={selectClassName}>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData?.status ?? "unvisited"}
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
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="order">Order</Label>
        <Input id="order" name="order" type="number" value={formData?.order ?? 0} onChange={handleChange} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData?.description ?? ""}
          placeholder="Add description..."
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cuisine">Cuisine</Label>
        <Input
          id="cuisine"
          name="cuisine"
          value={formData?.cuisine ?? ""}
          placeholder="e.g. Indian, Fusion"
          onChange={handleChange}
        />
        <p className="text-muted-foreground text-xs">Comma-separated if more than one.</p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="img_url">Image URL</Label>
        <Input id="img_url" name="img_url" value={formData?.img_url ?? ""} onChange={handleChange} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="detail_url">Detail URL</Label>
        <Input id="detail_url" name="detail_url" value={formData?.detail_url ?? ""} onChange={handleChange} />
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

function RestaurantRow({ restaurant, cityName, onSelect }) {
  const cuisines = parseCuisines(restaurant.cuisine);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="hover:bg-accent/50 border-border flex w-full items-center gap-3 border-b px-2 py-2.5 text-left transition-colors last:border-b-0"
    >
      <div className="size-14 shrink-0 overflow-hidden rounded-md bg-neutral-800">
        {restaurant.img_url && (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary external host, not known ahead of time
          <img src={restaurant.img_url} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-foreground truncate font-medium">{restaurant.name}</p>
          {restaurant.status && (
            <Badge variant={statusVariant(restaurant.status)} className="shrink-0">
              {statusLabel(restaurant.status)}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mt-0.5 flex items-center gap-1 truncate text-xs">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">
            {cityName}
            {cuisines.length > 0 && ` · ${cuisines.join(", ")}`}
          </span>
        </p>
      </div>

      <ChevronRight className="text-muted-foreground size-4 shrink-0" />
    </button>
  );
}

function RestaurantDetailsDialog({ restaurant, cityName, isAdmin, open, onOpenChange, onEdit, onDelete }) {
  if (!restaurant) return null;

  const cuisines = parseCuisines(restaurant.cuisine);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0">
        {restaurant.img_url && (
          <div className="relative aspect-video w-full bg-neutral-800">
            <div className="absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black/50 to-transparent" />
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary external host, not known ahead of time */}
            <img src={restaurant.img_url} alt={restaurant.name} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-2 pr-8">
            <DialogTitle className="font-display text-xl font-medium">{restaurant.name}</DialogTitle>
            {restaurant.status && (
              <Badge variant={statusVariant(restaurant.status)} className="shrink-0">
                {statusLabel(restaurant.status)}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
            <MapPin className="size-3.5" />
            {cityName}
          </p>

          {cuisines.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {cuisines.map((cuisine) => (
                <Badge key={cuisine} variant="outline">
                  {cuisine}
                </Badge>
              ))}
            </div>
          )}

          {restaurant.description && (
            <p className="text-muted-foreground mt-3 text-sm">{restaurant.description}</p>
          )}

          {restaurant.notes && (
            <p className="text-foreground/80 border-border mt-3 border-t pt-3 text-sm italic">{restaurant.notes}</p>
          )}

          <DialogFooter className="mt-6">
            {isAdmin && (
              <>
                <Button type="button" variant="outline" onClick={onEdit}>
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button type="button" variant="destructive" onClick={onDelete}>
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </>
            )}
            {restaurant.detail_url && (
              <Button asChild>
                <a href={restaurant.detail_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Visit website
                </a>
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Foodlist({ cities, foodlist: initialFoodlist }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [fetchFailed, setFetchFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodlist, setFoodlist] = useState(initialFoodlist ?? []);
  const [formData, setFormData] = useState({});
  const [query, setQuery] = useState("");
  const [cuisineQuery, setCuisineQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [activeStatuses, setActiveStatuses] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const cityById = new Map((cities ?? []).map((city) => [city.id, city]));
  const allCuisines = Array.from(new Set(foodlist.flatMap((restaurant) => parseCuisines(restaurant.cuisine)))).sort(
    (a, b) => a.localeCompare(b)
  );

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const hasActiveFilters = query || cuisineQuery || cityQuery || activeStatuses.length > 0;

  function clearFilters() {
    setQuery("");
    setCuisineQuery("");
    setCityQuery("");
    setActiveStatuses([]);
  }

  const filteredFoodlist = foodlist
    .filter((r) => {
      if (!cityQuery) return true;
      const cityName = cityById.get(r.city)?.name ?? "";
      return cityName.toLowerCase().includes(cityQuery.toLowerCase());
    })
    .filter((r) => activeStatuses.length === 0 || activeStatuses.includes(r.status))
    .filter((r) => {
      if (!cuisineQuery) return true;
      const q = cuisineQuery.toLowerCase();
      return parseCuisines(r.cuisine).some((c) => c.toLowerCase().includes(q));
    })
    .filter((r) => {
      const q = query.toLowerCase();
      if (!q) return true;
      return (
        r.name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.cuisine?.toLowerCase().includes(q) ||
        r.notes?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const cityOrderA = cityById.get(a.city)?.order ?? 0;
      const cityOrderB = cityById.get(b.city)?.order ?? 0;
      if (cityOrderA !== cityOrderB) return cityOrderA - cityOrderB;
      return a.order - b.order;
    });

  async function handleCreateRestaurant(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/foodlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newRestaurant = await response.json();
        setFoodlist((prev) => [...prev, newRestaurant]);
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

  async function handleUpdateRestaurant(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/foodlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedRestaurant = await response.json();
        setFoodlist((prev) => prev.map((r) => (r.id === updatedRestaurant.id ? updatedRestaurant : r)));
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

  async function handleDeleteRestaurant(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/foodlist?id=${formData.id}`, { method: "DELETE" });

      if (response.ok) {
        setFoodlist((prev) => prev.filter((r) => r.id !== formData.id));
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
      city: cities?.[0]?.id ?? "",
      order: 0,
      status: "unvisited",
      description: "",
      cuisine: "",
      img_url: "",
      detail_url: "",
      notes: "",
    });
    setCreateOpen(true);
  }

  function openView(restaurant) {
    setFormData(restaurant);
    setViewOpen(true);
  }

  function openEdit(restaurant) {
    setFormData(restaurant);
    setViewOpen(false);
    setUpdateOpen(true);
  }

  function openDelete(restaurant) {
    setFormData(restaurant);
    setViewOpen(false);
    setDeleteOpen(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      {fetchFailed && (
        <div className="border-destructive/50 bg-destructive/10 text-destructive mb-4 flex items-center gap-2 rounded-md border px-4 py-3 text-sm">
          <AlertTriangle className="size-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <p className="font-display flex flex-wrap items-baseline gap-x-2 gap-y-1 text-2xl font-light sm:text-3xl">
        <span>I want to eat</span>
        <input
          list="cuisine-options"
          value={cuisineQuery}
          onChange={(e) => setCuisineQuery(e.target.value)}
          placeholder="anything"
          size={cuisineQuery.length || "anything".length}
          className="border-muted-foreground/40 focus:border-primary [field-sizing:content] min-w-24 max-w-64 border-b-2 border-dashed bg-transparent px-1 text-red-600 outline-none placeholder:text-red-600/40 dark:text-red-400 dark:placeholder:text-red-400/40"
        />
        <span>in</span>
        <input
          list="city-options"
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
          placeholder="anywhere"
          size={cityQuery.length || "anywhere".length}
          className="border-muted-foreground/40 focus:border-primary [field-sizing:content] min-w-24 max-w-64 border-b-2 border-dashed bg-transparent px-1 text-red-600 outline-none placeholder:text-red-600/40 dark:text-red-400 dark:placeholder:text-red-400/40"
        />
        <span>.</span>
      </p>

      <datalist id="cuisine-options">
        {allCuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine} />
        ))}
      </datalist>
      <datalist id="city-options">
        {cities?.map((city) => (
          <option key={city.id} value={city.name} />
        ))}
      </datalist>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Or search by name..."
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
          {filteredFoodlist.length} restaurant{filteredFoodlist.length === 1 ? "" : "s"}
        </p>

        {isAdmin && (
          <Button type="button" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Add restaurant
          </Button>
        )}
      </div>

      <div className="border-border divide-border mt-4 divide-y rounded-lg border">
        {filteredFoodlist.map((restaurant) => (
          <RestaurantRow
            key={restaurant.id}
            restaurant={restaurant}
            cityName={cityById.get(restaurant.city)?.name ?? ""}
            onSelect={() => openView(restaurant)}
          />
        ))}
      </div>

      {filteredFoodlist.length === 0 && (
        <p className="text-muted-foreground mt-12 text-center text-sm">No restaurants match your filters.</p>
      )}

      <RestaurantDetailsDialog
        restaurant={formData?.id ? formData : null}
        cityName={cityById.get(formData?.city)?.name ?? ""}
        isAdmin={isAdmin}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onEdit={() => openEdit(formData)}
        onDelete={() => openDelete(formData)}
      />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add restaurant</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRestaurant} className="grid gap-4">
            <RestaurantForm formData={formData} setFormData={setFormData} cities={cities} />
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
            <DialogTitle>Edit restaurant</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateRestaurant} className="grid gap-4">
            <RestaurantForm formData={formData} setFormData={setFormData} cities={cities} />
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
            <DialogTitle>Delete restaurant</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeleteRestaurant}>
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
