
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateListing.css"; // Make sure to create and import your CSS

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Upload Image Logic
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, ...urls],
          }));
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  // Store Image to Firebase
  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({ ...prev, type: id }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount price must be lower than regular price");
      }

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        return setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="create-listing-container">
      <h1 className="create-listing-title">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="create-listing-form">
        {/* LEFT */}
        <div className="form-left">
          <input
            type="text"
            placeholder="Name"
            className="form-input"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="form-textarea"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="form-input"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="checkbox-group">
            {["sale", "rent", "parking", "furnished", "offer"].map((id) => (
              <div className="checkbox-item" key={id}>
                <input
                  type="checkbox"
                  id={id}
                  className="checkbox-input"
                  onChange={handleChange}
                  checked={
                    id === "sale"
                      ? formData.type === "sale"
                      : id === "rent"
                      ? formData.type === "rent"
                      : formData[id]
                  }
                />
                <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="form-right">
          <p className="images-label">
            Images:
            <span className="images-note"> The first image will be the cover (max 6)</span>
          </p>
          <div className="upload-group">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="file-input"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="upload-button"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && <p className="error-message">{imageUploadError}</p>}
          {formData.imageUrls.map((url, index) => (
            <div key={url} className="image-preview">
              <img src={url} alt="listing" className="preview-img" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
          <button disabled={loading || uploading} className="submit-button">
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </main>
  );
}
