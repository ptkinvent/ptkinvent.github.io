"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { faMapPin, faPlus, faPencil, faTrash, faCog, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateRestaurantModal({ isSubmitting, formData, setFormData, cities, handleCreateRestaurant }) {
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal fade" id="createRestaurantModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add restaurant</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleCreateRestaurant(e, formData)}>
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
                <label className="form-label">City</label>
                <select
                  name="city"
                  className="form-select"
                  value={formData?.city}
                  onChange={handleChange}
                  placeholder="Select..."
                >
                  {cities?.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Order</label>
                <input
                  name="order"
                  type="number"
                  className="form-control"
                  value={formData?.order}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData?.status} onChange={handleChange}>
                  <option value="unvisited">Unvisited</option>
                  <option value="visited">Visited</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData?.description}
                  placeholder="Add description..."
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cuisine</label>
                <input
                  type="text"
                  name="cuisine"
                  className="form-control"
                  value={formData?.cuisine}
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

function UpdateRestaurantModal({ isSubmitting, formData, setFormData, cities, handleUpdateRestaurant }) {
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="modal fade" id="updateRestaurantModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit restaurant</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleUpdateRestaurant(e, formData)}>
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
                <label className="form-label">City</label>
                <select
                  name="city"
                  className="form-select"
                  value={formData?.city}
                  onChange={handleChange}
                  placeholder="Select..."
                >
                  {cities?.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Order</label>
                <input
                  name="order"
                  type="number"
                  className="form-control"
                  value={formData?.order}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData?.status} onChange={handleChange}>
                  <option value="unvisited">Unvisited</option>
                  <option value="visited">Visited</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData?.description}
                  placeholder="Add description..."
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cuisine</label>
                <input
                  type="text"
                  name="cuisine"
                  className="form-control"
                  value={formData?.cuisine}
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

function DeleteRestaurantModal({ isSubmitting, formData, handleDeleteRestaurant }) {
  return (
    <div className="modal fade" id="deleteRestaurantModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete restaurant</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleDeleteRestaurant(e, formData)}>
            <div className="modal-body">
              <p>Are you sure you want to delete "{formData.name}"? This action cannot be undone.</p>
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

function RestaurantCity({ cityId, city, setFormData }) {
  return (
    <div className="accordion-item">
      <div className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${cityId}`}
        >
          <div className="d-flex gap-2 align-items-center">
            <FontAwesomeIcon icon={faMapPin} />
            <h4 className="mb-0">{city.name}</h4>
          </div>
        </button>
      </div>
      <div id={`collapse${cityId}`} className="accordion-collapse collapse">
        <div className="accordion-body">
          {city.restaurants.map((restaurant, index) => (
            <Restaurant key={index} restaurant={restaurant} setFormData={setFormData} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Restaurant({ restaurant, setFormData }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  let badge = "";
  switch (restaurant.status) {
    case "visited":
      badge = <span className="badge text-bg-success">Visited</span>;
      break;
    case "closed":
      badge = <span className="badge text-bg-danger">Closed</span>;
      break;
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={restaurant.img_url} className="w-100" height="180px" style={{ objectFit: "cover" }} />
        </div>
        <div className="col-md-8">
          <div className="card-body position-relative">
            <h5 className="card-title">
              <a href={restaurant.detail_url} target="_blank">
                {restaurant.order}. {restaurant.name}
              </a>{" "}
              {badge}
              {isAdmin && (
                <div className="dropdown position-absolute top-0 end-0 p-2">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <FontAwesomeIcon icon={faCog} />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#updateRestaurantModal"
                        onClick={() => setFormData(restaurant)}
                      >
                        <FontAwesomeIcon icon={faPencil} /> Edit
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteRestaurantModal"
                        onClick={() => setFormData(restaurant)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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

export default function Foodlist({ cities, foodlist: initialFoodlist }) {
  const { user } = useUser();
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodlist, setFoodlist] = useState(initialFoodlist);
  const [formData, setFormData] = useState({});
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

  async function handleCreateRestaurant(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/foodlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newRestaurant = await response.json();
        setFoodlist((prevFoodlist) => [...prevFoodlist, newRestaurant]);

        const modal = document.getElementById("createRestaurantModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to create restaurant");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Failed to create restaurant");
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateRestaurant(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/foodlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedRestaurant = await response.json();
        setFoodlist((prevFoodlist) =>
          prevFoodlist.map((restaurant) => (restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant))
        );

        const modal = document.getElementById("updateRestaurantModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to update restaurant");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Failed to update restaurant");
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteRestaurant(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/foodlist?id=${formData.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFoodlist((prevFoodlist) => prevFoodlist.filter((restaurant) => restaurant.id !== formData.id));

        const modal = document.getElementById("deleteRestaurantModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to delete restaurant");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Failed to delete restaurant");
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

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

  cities.forEach((city) => {
    city.restaurants = foodlist.filter((restaurant) => restaurant.city === city.id);
  });

  const checkedCuisines = cuisines.filter((cuisine) => cuisine.checked).map((cuisine) => cuisine.name.toLowerCase());
  const checkedStatuses = statuses.filter((status) => status.checked).map((status) => status.name);
  const filteredFoodlist = cities
    .map((city) => ({
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
        )
        .sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.order - b.order);

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          {fetchFailed && (
            <div className="alert alert-danger" role="alert">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Something went wrong. Please try again.
            </div>
          )}

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
                <label className="form-check-label uppercase" htmlFor={`checkbox-${status.name}`}>
                  <span className={`badge text-bg-${status.color}`}>{status.displayName}</span>
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
                <label className="form-check-label uppercase" htmlFor={`checkbox-${cuisine.name}`}>
                  {cuisine.name}
                </label>
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mb-4">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#createRestaurantModal"
                onClick={() =>
                  setFormData({
                    name: "",
                    city: cities[0].id,
                    order: 0,
                    description: "",
                    cuisine: "",
                    img_url: "",
                    detail_url: "",
                    notes: "",
                  })
                }
              >
                <FontAwesomeIcon icon={faPlus} /> Add restaurant
              </button>
            </div>
          )}

          <div className="accordion">
            {filteredFoodlist.map((city, cityId) => (
              <RestaurantCity key={cityId} city={city} cityId={cityId} setFormData={setFormData} />
            ))}
          </div>
        </div>
      </div>

      <CreateRestaurantModal
        isSubmitting={isSubmitting}
        formData={formData}
        setFormData={setFormData}
        cities={cities}
        handleCreateRestaurant={handleCreateRestaurant}
      />

      <UpdateRestaurantModal
        isSubmitting={isSubmitting}
        formData={formData}
        setFormData={setFormData}
        cities={cities}
        handleUpdateRestaurant={handleUpdateRestaurant}
      />

      <DeleteRestaurantModal
        isSubmitting={isSubmitting}
        formData={formData}
        handleDeleteRestaurant={handleDeleteRestaurant}
      />
    </>
  );
}
