"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faPlayCircle, faFilm } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function MovieModal({ selectedMovie }) {
  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedMovie?.name}</h5>
            <button type="button" className="btn-close" data-toggle="modal" data-target="#modal"></button>
          </div>
          <div className="modal-body">
            {selectedMovie?.trailer ? (
              <div className="video">
                <iframe src={selectedMovie?.trailer} className="embed-responsive-item" allowFullScreen></iframe>
              </div>
            ) : (
              <div className="border border-gray-300 rounded text-center">
                <p className="text-muted my-5">No trailer yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, setSelectedMovie }) {
  const unreleased = new Date(movie.release_date) > new Date();

  return (
    <div className="card h-100">
      <img
        className="card-img-top"
        src={movie.img_url || "https://www.flixster.com/images/defaultPoster.svg"}
        alt={movie.name}
        onClick={() =>
          setSelectedMovie({
            name: movie.name,
            trailer: movie.trailer_url ? "https://youtube.com/embed/" + movie.trailer_url.slice(32) : null,
          })
        }
        data-toggle="modal"
        data-target="#modal"
        style={{ cursor: "pointer" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          <a href={movie.detail_url} target="_blank">
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
        <p className="card-text">Release date: {new Date(movie.release_date).toLocaleDateString()}</p>

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
              onClick={() =>
                setSelectedMovie({
                  name: movie.name,
                  trailer: "https://youtube.com/embed/" + movie.trailer_url.slice(32),
                })
              }
              data-toggle="modal"
              data-target="#modal"
            >
              <FontAwesomeIcon icon={faFilm} /> Trailer
            </button>
          </>
        )}
      </div>

      {movie.notes && <div className="card-footer">{movie.notes}</div>}
    </div>
  );
}

export default function Watchlist({ watchlist }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState([
    { displayName: "Unwatched", name: "unwatched", color: "secondary", checked: false },
    { displayName: "Watching", name: "watching", color: "warning", checked: false },
    { displayName: "Watched", name: "watched", color: "success", checked: false },
  ]);

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
    </>
  );
}
