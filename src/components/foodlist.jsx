"use client";

import { useState } from "react";

function RestaurantCity({ cityId, city }) {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="mb-0">
          <button
            className="btn btn-lg btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${cityId}`}
          >
            <i className="fa fa-map-pin"></i>&nbsp;{city.name}{" "}
            <span className="text-secondary">
              <i className="fa fa-caret-down"></i>
            </span>
          </button>
        </h4>
      </div>
      <div id={`collapse${cityId}`} className="collapse">
        <div className="card-body">
          {city.restaurants.map((restaurant, index) => (
            <Restaurant key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Restaurant({ restaurant }) {
  let badge = "";
  switch (restaurant.status) {
    case "visited":
      badge = <span className="badge badge-success">Visited</span>;
      break;
    case "closed":
      badge = <span className="badge badge-danger">Closed</span>;
      break;
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={restaurant.img} className="w-100" height="180px" style={{ objectFit: "cover" }} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <a href={restaurant.link} target="_blank">
                {restaurant.name}
              </a>{" "}
              {badge}
            </h5>
            <p className="card-text">{restaurant.description}</p>
            <p className="card-text">
              <small className="text-muted">{restaurant.cuisine}</small>
            </p>
          </div>
        </div>
      </div>
      {restaurant.notes && <div className="card-footer">{restaurant.notes}</div>}
    </div>
  );
}

export default function Foodlist({ foodlist }) {
  const [query, setQuery] = useState("");
  const [cuisines, setCuisines] = useState([
    { name: "Thai", checked: false },
    { name: "Indian", checked: false },
    { name: "Chinese", checked: false },
    { name: "Italian", checked: false },
    { name: "French", checked: false },
    { name: "Seafood", checked: false },
    { name: "Japanese", checked: false },
    { name: "Korean", checked: false },
    { name: "Vietnamese", checked: false },
    { name: "Burmese", checked: false },
    { name: "Breakfast", checked: false },
    { name: "Tapas", checked: false },
    { name: "American", checked: false },
    { name: "Persian", checked: false },
    { name: "Latin American", checked: false },
    { name: "Moroccan", checked: false },
    { name: "Mediterranean", checked: false },
    { name: "Pizza", checked: false },
    { name: "Bakery", checked: false },
    { name: "Bar", checked: false },
  ]);
  const [statuses, setStatuses] = useState([
    { displayName: "Unvisited", name: "unvisited", color: "secondary", checked: false },
    { displayName: "Visited", name: "visited", color: "success", checked: false },
  ]);

  function handleChange(e) {
    setQuery(e.target.value.toLowerCase());
  }

  function handleCheckCuisine(e) {
    setCuisines((prevCuisines) =>
      prevCuisines.map((cuisine) =>
        cuisine.name === e.target.name ? { ...cuisine, checked: !cuisine.checked } : cuisine
      )
    );
  }

  function handleCheckStatus(e) {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) => (status.name === e.target.name ? { ...status, checked: !status.checked } : status))
    );
  }

  const checkedCuisines = cuisines.filter((cuisine) => cuisine.checked).map((cuisine) => cuisine.name.toLowerCase());
  const checkedStatuses = statuses.filter((status) => status.checked).map((status) => status.name);
  const filteredFoodlist = foodlist.map((city) => ({
    ...city,
    restaurants: city.restaurants
      .filter((restaurant) => checkedStatuses.length === 0 || checkedStatuses.includes(restaurant.status))
      .filter(
        (restaurant) => checkedCuisines.length === 0 || checkedCuisines.includes(restaurant.cuisine.toLowerCase())
      )
      .filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.description.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query)
      ),
  }));

  return (
    <div className="row">
      <div className="offset-lg-2 col-lg-8">
        <div className="mb-4 mt-2">
          <input value={query} onChange={handleChange} className="form-control mb-1" placeholder="Search..." />

          {statuses.map((status) => (
            <div key={status.name} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox-${status.name}`}
                name={status.name}
                checked={status.checked}
                onChange={handleCheckStatus}
              />
              <label className="form-check-label uppercase" for={`checkbox-${status.name}`}>
                <span className={`badge badge-${status.color}`}>{status.displayName}</span>
              </label>
            </div>
          ))}

          {cuisines.map((cuisine) => (
            <div key={cuisine.name} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox-${cuisine.name}`}
                name={cuisine.name}
                checked={cuisine.checked}
                onChange={handleCheckCuisine}
              />
              <label className="form-check-label uppercase" for={`checkbox-${cuisine.name}`}>
                {cuisine.name}
              </label>
            </div>
          ))}
        </div>

        <div className="accordion">
          {filteredFoodlist.map((city, cityId) => (
            <RestaurantCity key={cityId} city={city} cityId={cityId} />
          ))}
        </div>
      </div>
    </div>
  );
}
