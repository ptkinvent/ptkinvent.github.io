"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Masonry } from "masonic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCog, faPencil, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function PhotoModal({ selectedPhoto }) {
  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="flex flex-col gap-4">
              <h5 className="modal-title">{selectedPhoto?.caption}</h5>
              <h6 className="text-muted">{new Date(selectedPhoto?.taken_at).toLocaleDateString()}</h6>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body d-flex align-items-center justify-content-center">
            {selectedPhoto && (
              <img
                src={selectedPhoto.path}
                className="card-img"
                alt={selectedPhoto?.caption}
                style={{
                  maxHeight: "80vh",
                  maxWidth: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatePhotoModal({ isSubmitting, formData, setFormData, handleCreatePhoto }) {
  function handleChange(e) {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="modal fade" id="createPhotoModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add photo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleCreatePhoto(e, formData)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  name="image"
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Caption</label>
                <textarea
                  name="caption"
                  className="form-control"
                  value={formData?.caption || ""}
                  placeholder="Add caption..."
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date taken</label>
                <input
                  name="taken_at"
                  type="date"
                  className="form-control"
                  value={formData?.taken_at || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                disabled={isSubmitting}
              >
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

function UpdatePhotoModal({ isSubmitting, formData, setFormData, handleUpdatePhoto }) {
  function handleChange(e) {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="modal fade" id="updatePhotoModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit photo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleUpdatePhoto(e, formData)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Image</label>
                <img
                  src={formData.path}
                  className="card-img w-100 rounded border border-secondary"
                  alt={formData.caption}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Caption</label>
                <textarea
                  name="caption"
                  className="form-control"
                  value={formData?.caption || ""}
                  placeholder="Add caption..."
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date taken</label>
                <input
                  name="taken_at"
                  type="date"
                  className="form-control"
                  value={formData?.taken_at ? new Date(formData?.taken_at).toISOString().split("T")[0] : ""}
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

function DeletePhotoModal({ isSubmitting, formData, handleDeletePhoto }) {
  return (
    <div className="modal fade" id="deletePhotoModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete photo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form onSubmit={(e) => handleDeletePhoto(e, formData)}>
            <div className="modal-body">
              <p>Are you sure you want to delete this photo? This action cannot be undone.</p>
              <img
                src={formData.path}
                className="card-img w-100 rounded border border-secondary"
                alt={formData.caption}
              />
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

function MasonryItem({ index, data, width }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <>
      {/* Clickable images for larger screens */}
      <div className="card d-none d-sm-block position-relative">
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
                    data-bs-target="#updatePhotoModal"
                    onClick={() => data.setFormData(data)}
                  >
                    <FontAwesomeIcon icon={faPencil} /> Edit
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePhotoModal"
                    onClick={() => data.setFormData(data)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        <img
          src={data.path}
          className="card-img h-auto"
          alt={data.caption}
          onClick={() => data.setSelectedPhoto(data)}
          style={{ cursor: "zoom-in" }}
          data-bs-toggle="modal"
          data-bs-target="#modal"
        />
      </div>

      {/* Captioned images for smaller screens */}
      <div className="card d-sm-none">
        <img src={data.path} className="card-img-top h-auto" alt={data.caption} />
        <div className="card-body">
          <h5 className="card-title">{data.caption}</h5>
          <p className="card-text">{data.taken_at}</p>
        </div>
      </div>
    </>
  );
}

export default function PhotoGrid() {
  const { user } = useUser();
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formData, setFormData] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    fetch("/api/photography")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  async function handleCreatePhoto(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("caption", formData.caption);
      formDataToSend.append("taken_at", formData.taken_at);

      const response = await fetch("/api/photography", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const newPhoto = await response.json();
        setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);

        const modal = document.getElementById("createPhotoModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Error creating photo:", error);
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdatePhoto(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/photography", {
        method: "PATCH",
        body: JSON.stringify({ id: formData.id, caption: formData.caption, taken_at: formData.taken_at }),
      });

      if (response.ok) {
        const updatedPhoto = await response.json();
        setPhotos((prevPhotos) => prevPhotos.map((photo) => (photo.id === updatedPhoto.id ? updatedPhoto : photo)));

        const modal = document.getElementById("updatePhotoModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to update photo");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Error updating photo:", error);
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletePhoto(e, formData) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/photography?id=${formData.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== formData.id));

        const modal = document.getElementById("deletePhotoModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      } else {
        console.error("Failed to delete photo");
        setFetchFailed(true);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      setFetchFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isClient) {
    return (
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          {fetchFailed && (
            <div className="alert alert-danger" role="alert">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Something went wrong. Please try again.
            </div>
          )}

          {isAdmin && (
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createPhotoModal"
              type="button"
              onClick={() =>
                setFormData({ image: null, caption: "", taken_at: new Date().toISOString().split("T")[0] })
              }
            >
              <FontAwesomeIcon icon={faPlus} /> Add photo
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Masonry
          key={photos.length} // Force re-render when items change
          items={photos
            .sort((a, b) => new Date(b.taken_at) - new Date(a.taken_at))
            .map((photo) => ({ ...photo, selectedPhoto, setSelectedPhoto, setFormData }))}
          render={MasonryItem}
          maxColumnCount={3}
          columnGutter={16}
        />
      </div>

      <PhotoModal selectedPhoto={selectedPhoto} />
      <CreatePhotoModal
        isSubmitting={isSubmitting}
        formData={formData}
        setFormData={setFormData}
        handleCreatePhoto={handleCreatePhoto}
      />
      <UpdatePhotoModal
        isSubmitting={isSubmitting}
        formData={formData}
        setFormData={setFormData}
        handleUpdatePhoto={handleUpdatePhoto}
      />
      <DeletePhotoModal isSubmitting={isSubmitting} formData={formData} handleDeletePhoto={handleDeletePhoto} />
    </>
  );
}
