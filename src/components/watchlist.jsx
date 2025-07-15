"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faPlayCircle, faFilm, faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function MovieModal({ selectedMovie }) {
  const embed_url = selectedMovie?.trailer_url
    ? "https://youtube.com/embed/" + selectedMovie.trailer_url.slice(32)
    : null;

  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedMovie?.name}</h5>
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

function CreateMovieModal({ selectedMovie, setSelectedMovie, handleCreateMovie }) {
  function handleChange(e) {
    setSelectedMovie({ ...selectedMovie, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal fade" id="createMovieModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add movie</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleCreateMovie(e, selectedMovie)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={selectedMovie?.status} onChange={handleChange}>
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
                  value={selectedMovie?.release_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  name="img_url"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.img_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trailer URL</label>
                <input
                  name="trailer_url"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.trailer_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Detail URL</label>
                <input
                  name="detail_url"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.detail_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  value={selectedMovie?.notes}
                  placeholder="Add notes..."
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function UpdateMovieModal({ selectedMovie, setSelectedMovie, handleUpdateMovie }) {
  function handleChange(e) {
    setSelectedMovie({ ...selectedMovie, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal fade" id="updateMovieModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit "{selectedMovie?.name}"</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleUpdateMovie(e, selectedMovie)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={selectedMovie?.status} onChange={handleChange}>
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
                  value={selectedMovie?.release_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  name="img_url"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.img_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trailer URL</label>
                <input
                  name="trailer_url"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.trailer_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Detail URL</label>
                <input
                  name="detail_url"
                  type="text"
                  className="form-control"
                  value={selectedMovie?.detail_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  value={selectedMovie?.notes}
                  placeholder="Add notes..."
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function DeleteMovieModal({ selectedMovie, handleDeleteMovie }) {
  return (
    <div className="modal fade" id="deleteMovieModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete "{selectedMovie?.name}"?</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleDeleteMovie(e, selectedMovie)}>
            <div className="modal-body">Are you sure you want to delete this movie? This action cannot be undone.</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, setSelectedMovie }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const unreleased = new Date(movie.release_date) > new Date();

  return (
    <div className="card h-100">
      <div className="card-img-top ratio bg-dark bg-gradient" style={{ "--bs-aspect-ratio": "150%" }}>
        <img
          className="card-img-top ratio object-fit-cover"
          style={{ cursor: "pointer" }}
          src={movie.img_url}
          onClick={() => setSelectedMovie(movie)}
          data-bs-toggle="modal"
          data-bs-target="#modal"
        />
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

        {movie.detail_url &&
          (movie.detail_url.includes("fandango") ? (
            <>
              <a href={movie.detail_url} target="_blank" className="btn btn-outline-secondary d-xl-none w-100 mb-2">
                <FontAwesomeIcon icon={faTicket} /> Tickets
              </a>

              <a
                href={movie.detail_url}
                target="_blank"
                className="btn btn-outline-secondary d-none d-xl-inline-block me-2"
              >
                <FontAwesomeIcon icon={faTicket} /> Tickets
              </a>
            </>
          ) : (
            <>
              <a href={movie.detail_url} target="_blank" className="btn btn-outline-secondary d-xl-none w-100 mb-2">
                <FontAwesomeIcon icon={faPlayCircle} /> Stream
              </a>

              <a
                href={movie.detail_url}
                target="_blank"
                className="btn btn-outline-secondary d-none d-xl-inline-block me-2"
              >
                <FontAwesomeIcon icon={faPlayCircle} /> Stream
              </a>
            </>
          ))}

        {movie.trailer_url && (
          <>
            <a className="btn btn-outline-danger w-100 d-xl-none" target="_blank" href={movie.trailer_url}>
              <FontAwesomeIcon icon={faFilm} /> Trailer
            </a>

            <button
              className="btn btn-outline-danger d-none d-xl-inline-block"
              type="button"
              onClick={() => setSelectedMovie(movie)}
              data-bs-toggle="modal"
              data-bs-target="#modal"
            >
              <FontAwesomeIcon icon={faFilm} /> Trailer
            </button>
          </>
        )}

        {isAdmin && (
          <div className="dropdown d-xl-inline-block">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            ></button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#updateMovieModal"
                  onClick={() => setSelectedMovie(movie)}
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
                  onClick={() => setSelectedMovie(movie)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {movie.notes && <div className="card-footer">{movie.notes}</div>}
    </div>
  );
}

export default function Watchlist({ watchlist: initialWatchlist }) {
  const { user } = useUser();
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState([
    { displayName: "Unwatched", name: "unwatched", color: "secondary", checked: false },
    { displayName: "Watching", name: "watching", color: "warning", checked: false },
    { displayName: "Watched", name: "watched", color: "success", checked: false },
  ]);

  const isAdmin = user?.publicMetadata?.role === "admin";

  async function handleCreateMovie(e, movie) {
    e.preventDefault();

    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: movie.id,
          name: movie.name,
          status: movie.status,
          release_date: movie.release_date,
          img_url: movie.img_url,
          trailer_url: movie.trailer_url,
          detail_url: movie.detail_url,
          notes: movie.notes,
        }),
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
      }
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  }

  async function handleUpdateMovie(e, movie) {
    e.preventDefault();

    try {
      const response = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: movie.id,
          name: movie.name,
          status: movie.status,
          release_date: movie.release_date,
          img_url: movie.img_url,
          trailer_url: movie.trailer_url,
          detail_url: movie.detail_url,
          notes: movie.notes,
        }),
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
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  }

  async function handleDeleteMovie(e, movie) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/watchlist?id=${movie.id}`, {
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
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
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
    .filter((movie) => movie.name.toLowerCase().includes(query));

  return (
    <>
      {isAdmin && (
        <div className="row mb-4">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createMovieModal"
              onClick={() =>
                setSelectedMovie({
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
            <Movie key={index} movie={movie} setSelectedMovie={setSelectedMovie} />
          </div>
        ))}
      </div>

      <MovieModal selectedMovie={selectedMovie} />

      <CreateMovieModal
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        handleCreateMovie={handleCreateMovie}
      />

      <UpdateMovieModal
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        handleUpdateMovie={handleUpdateMovie}
      />

      <DeleteMovieModal selectedMovie={selectedMovie} handleDeleteMovie={handleDeleteMovie} />
    </>
  );
}
