"use client";

import { watchlist } from "@/data/watchlist";
import { useState } from "react";

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

export default function WatchList() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", marginTop: "20px", marginBottom: "20px" }} />
          <img src="/img/watchlist-banner.jpg" className="header-img" />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <h2 className="about-intro">
            <span className="text-danger">Watch.</span> These are some items on my watchlist.
          </h2>
          <p>
            I love movies and TV shows but I don't enjoy watching alone. Feel free to{" "}
            <a href="mailto:ptkinvent@gmail.com">message me</a> if you'd like to watch any of these together!
          </p>
          <p className="text-primary">Last updated: {new Date().toLocaleDateString()}.</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="row">
            {watchlist.map((movie, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-6 mt-3">
                <Movie key={index} movie={movie} setSelectedMovie={setSelectedMovie} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <MovieModal selectedMovie={selectedMovie} />
    </>
  );
}
