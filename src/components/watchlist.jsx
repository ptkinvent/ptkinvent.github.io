"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faPlayCircle,
  faFilm,
  faPencil,
  faTrash,
  faPlus,
  faCog,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

function MovieModal({ formData }) {
  const embed_url = formData?.trailer_url ? "https://youtube.com/embed/" + formData.trailer_url.slice(32) : null;

  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData?.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {embed_url ? (
              <div className="ratio ratio-16x9">
                <iframe src={embed_url} className="embed-responsive-item" allowFullScreen></iframe>
              </div>
            ) : (
              <div className="ratio ratio-16x9">
                <div className="border border-gray-300 rounded bg-secondary-subtle d-flex justify-content-center align-items-center">
                  <p className="text-muted">No trailer yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateMovieModal({ isSubmitting, formData, setFormData, handleCreateMovie }) {
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal fade" id="createMovieModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add movie</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleCreateMovie(e, formData)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData?.status} onChange={handleChange}>
                  <option value="unwatched">Unwatched</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Release date</label>
                <input
                  name="release_date"
                  type="date"
                  className="form-control"
                  value={formData?.release_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  name="img_url"
                  type="text"
                  className="form-control"
                  value={formData?.img_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trailer URL</label>
                <input
                  name="trailer_url"
                  type="text"
                  className="form-control"
                  value={formData?.trailer_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Detail URL</label>
                <input
                  name="detail_url"
                  type="text"
                  className="form-control"
                  value={formData?.detail_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  value={formData?.notes}
                  placeholder="Add notes..."
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function UpdateMovieModal({ isSubmitting, formData, setFormData, handleUpdateMovie }) {
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal fade" id="updateMovieModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit movie</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleUpdateMovie(e, formData)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData?.status} onChange={handleChange}>
                  <option value="unwatched">Unwatched</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Release date</label>
                <input
                  name="release_date"
                  type="date"
                  className="form-control"
                  value={formData?.release_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  name="img_url"
                  type="text"
                  className="form-control"
                  value={formData?.img_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trailer URL</label>
                <input
                  name="trailer_url"
                  type="text"
                  className="form-control"
                  value={formData?.trailer_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Detail URL</label>
                <input
                  name="detail_url"
                  type="text"
                  className="form-control"
                  value={formData?.detail_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  value={formData?.notes}
                  placeholder="Add notes..."
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function DeleteMovieModal({ isSubmitting, formData, handleDeleteMovie }) {
  return (
    <div className="modal fade" id="deleteMovieModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete movie</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleDeleteMovie(e, formData)}>
            <div className="modal-body">
              Are you sure you want to delete "{formData?.name}"? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, setFormData }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const unreleased = new Date(movie.release_date) > new Date();

  return (
    <div className="card h-100">
      <div className="card-img-top bg-secondary-subtle bg-gradient position-relative">
        <div className="ratio" style={{ "--bs-aspect-ratio": "150%", cursor: "pointer" }}>
          {movie.img_url && (
            <img
              className="card-img-top ratio object-fit-cover"
              src={movie.img_url}
              onClick={() => setFormData(movie)}
              data-bs-toggle="modal"
              data-bs-target="#modal"
            />
          )}
        </div>

        {isAdmin && (
          <div className="position-absolute top-0 end-0 p-2">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <FontAwesomeIcon icon={faCog} />
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#updateMovieModal"
                    onClick={() => setFormData(movie)}
                  >
                    <FontAwesomeIcon icon={faPencil} /> Edit
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteMovieModal"
                    onClick={() => setFormData(movie)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <a href={movie.detail_url || null} target="_blank">
            {movie.name}
          </a>{" "}
          {unreleased ? (
            <span className="badge text-bg-danger">Unreleased</span>
          ) : (
            <>
              {movie.status === "watched" && <span className="badge text-bg-success">Watched</span>}
              {movie.status === "watching" && <span className="badge text-bg-warning">Watching</span>}
            </>
          )}
        </h5>
        <p className="card-text">
          Release date: {new Date(movie.release_date).toLocaleDateString("en-US", { timeZone: "UTC" })}
        </p>

        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-column flex-md-row gap-2">
            {movie.trailer_url && (
              <>
                <button
                  className="btn btn-outline-danger w-100"
                  type="button"
                  onClick={() => setFormData(movie)}
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                >
                  <FontAwesomeIcon icon={faFilm} /> Trailer
                </button>
              </>
            )}

            {movie.detail_url &&
              (movie.detail_url.includes("fandango") ? (
                <a href={movie.detail_url} target="_blank" className="btn btn-outline-secondary w-100">
                  <FontAwesomeIcon icon={faTicket} /> Tickets
                </a>
              ) : (
                <a href={movie.detail_url} target="_blank" className="btn btn-outline-secondary w-100">
                  <FontAwesomeIcon icon={faPlayCircle} /> Stream
                </a>
              ))}
          </div>
        </div>
      </div>

      {movie.notes && <div className="card-footer">{movie.notes}</div>}
    </div>
  );
}

export default function Watchlist({ watchlist: initialWatchlist }) {
  const { user } = useUser();
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [formData, setFormData] = useState(null);
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState([
    { displayName: "Unwatched", name: "unwatched", color: "secondary", checked: false },
    { displayName: "Watching", name: "watching", color: "warning", checked: false },
    { displayName: "Watched", name: "watched", color: "success", checked: false },
  ]);

  const isAdmin = user?.publicMetadata?.role === "admin";

  async function handleCreateMovie(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setWatchlist((prevWatchlist) => [...prevWatchlist, newMovie]);

        const modal = document.getElementById("createMovieModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to create movie");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateMovie(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedMovie = await response.json();
        setWatchlist((prevWatchlist) =>
          prevWatchlist.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
        );

        const modal = document.getElementById("updateMovieModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to update movie");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteMovie(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/watchlist?id=${formData.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWatchlist((prevWatchlist) => prevWatchlist.filter((m) => m.id !== movie.id));

        const modal = document.getElementById("deleteMovieModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to delete movie");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e) {
    setQuery(e.target.value.toLowerCase());
  }

  function handleCheck(e) {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) => (status.name === e.target.name ? { ...status, checked: !status.checked } : status))
    );
  }

  const checkedStatuses = statuses.filter((status) => status.checked).map((status) => status.name);
  const filteredWatchlist = watchlist
    .filter((movie) => checkedStatuses.length === 0 || checkedStatuses.includes(movie.status))
    .filter((movie) => movie.name.toLowerCase().includes(query))
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  return (
    <>
      {isAdmin && (
        <div className="row mb-4">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            {fetchFailed && (
              <div className="alert alert-danger" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} /> Something went wrong. Please try again.
              </div>
            )}

            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createMovieModal"
              onClick={() =>
                setFormData({
                  name: "",
                  status: "unwatched",
                  release_date: "",
                  img_url: "",
                  trailer_url: "",
                  detail_url: "",
                  notes: "",
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} /> Add movie
            </button>
          </div>
        </div>
      )}

      <div className="row mb-4">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <input value={query} onChange={handleChange} className="form-control mb-1" placeholder="Search..." />

          {statuses.map((status) => (
            <div key={status.name} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox-${status.name}`}
                name={status.name}
                checked={status.checked}
                onChange={handleCheck}
              />
              <label className="form-check-label uppercase" htmlFor={`checkbox-${status.name}`}>
                <span className={`badge text-bg-${status.color}`}>{status.displayName}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        {filteredWatchlist.map((movie, index) => (
          <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-3">
            <Movie key={index} movie={movie} setFormData={setFormData} />
          </div>
        ))}
      </div>

      <MovieModal formData={formData} />

      <CreateMovieModal
        isSubmitting={isSubmitting}
        formData={formData}
        setFormData={setFormData}
        handleCreateMovie={handleCreateMovie}
      />

      <UpdateMovieModal
        isSubmitting={isSubmitting}
        formData={formData}
        setFormData={setFormData}
        handleUpdateMovie={handleUpdateMovie}
      />

      <DeleteMovieModal isSubmitting={isSubmitting} formData={formData} handleDeleteMovie={handleDeleteMovie} />
    </>
  );
}
