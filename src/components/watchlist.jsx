"use client";

import { useState } from "react";

function MovieModal({ selectedMovie }) {
  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedMovie?.name}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="video">
              <iframe src={selectedMovie?.trailer} className="embed-responsive-item" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, setSelectedMovie }) {
  const unreleased = new Date(movie.releaseDate) > new Date();

  return (
    <div className="card h-100">
      <img
        className="card-img-top"
        src={movie.img || "https://www.flixster.com/images/defaultPoster.svg"}
        alt={movie.name}
      />
      <div className="card-body">
        <h5 className="card-title">
          <a href={movie.tickets ? movie.tickets : movie.stream} target="_blank">
            {movie.name}
          </a>{" "}
          {unreleased ? (
            <span className="badge badge-danger">Unreleased</span>
          ) : (
            <>
              {movie.status === "watched" && <span className="badge badge-success">Watched</span>}
              {movie.status === "watching" && <span className="badge badge-warning">Watching</span>}
            </>
          )}
        </h5>
        <p className="card-text">Release date: {new Date(movie.releaseDate).toLocaleDateString()}</p>

        {movie.tickets && (
          <>
            <a href={movie.tickets} target="_blank" className="btn btn-outline-primary d-xl-none btn-block mb-2">
              <i className="fa fa-ticket-alt"></i> Tickets
            </a>

            <a href={movie.tickets} target="_blank" className="btn btn-outline-primary d-none d-xl-inline-block mr-2">
              <i className="fa fa-ticket-alt"></i> Tickets
            </a>
          </>
        )}

        {movie.stream && (
          <>
            <a href={movie.stream} target="_blank" className="btn btn-outline-primary d-xl-none btn-block mb-2">
              <i className="fa fa-play-circle"></i> Stream
            </a>

            <a href={movie.stream} target="_blank" className="btn btn-outline-primary d-none d-xl-inline-block mr-2">
              <i className="fa fa-play-circle"></i> Stream
            </a>
          </>
        )}

        {movie.trailer && (
          <>
            <a className="btn btn-outline-secondary btn-block d-xl-none" target="_blank" href={movie.trailer}>
              <i className="fas fa-film"></i> Trailer
            </a>

            <button
              className="btn btn-outline-secondary d-none d-xl-inline-block"
              type="button"
              onClick={() =>
                setSelectedMovie({
                  name: movie.name,
                  trailer: "https://youtube.com/embed/" + movie.trailer.slice(32),
                })
              }
              data-toggle="modal"
              data-target="#modal"
            >
              <i className="fas fa-film"></i> Trailer
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
      <div className="row mb-2">
        <div className="offset-lg-2 col-lg-8">
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
              <label className="form-check-label uppercase" for={`checkbox-${status.name}`}>
                <span className={`badge badge-${status.color}`}>{status.displayName}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        {filteredWatchlist.map((movie, index) => (
          <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-6 mt-3">
            <Movie key={index} movie={movie} setSelectedMovie={setSelectedMovie} />
          </div>
        ))}
      </div>

      <MovieModal selectedMovie={selectedMovie} />
    </>
  );
}
