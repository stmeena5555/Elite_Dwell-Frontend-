
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import './Listing.css';  

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div className="listing-container">
          {/* Listing Images */}
          <div className="listing-images">
            {listing.imageUrls.map((url) => (
              <div
                key={url}
                className="listing-image"
                style={{ backgroundImage: `url(${url})` }}
              ></div>
            ))}
          </div>

          {/* Share Button */}
          <div className="share-btn" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}>
            <FaShare className="share-icon" />
          </div>
          {copied && <p className="link-copied-text">Link copied!</p>}

          {/* Listing Details */}
          <div className="listing-details">
            <p className="listing-price">
              {listing.name} - ${listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="listing-address">
              <FaMapMarkerAlt className="icon" />
              {listing.address}
            </p>

            <div className="listing-badges">
              <p className="badge">{listing.type === "rent" ? "For Rent" : "For Sale"}</p>
              {listing.offer && <p className="badge offer-badge">${+listing.regularPrice - +listing.discountPrice} OFF</p>}
            </div>

            <p className="listing-description">
              <span className="description-title">Description - </span>{listing.description}
            </p>
            <ul className="listing-features">
              <li><FaBed className="icon" /> {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</li>
              <li><FaBath className="icon" /> {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</li>
              <li><FaParking className="icon" /> {listing.parking ? "Parking spot" : "No Parking"}</li>
              <li><FaChair className="icon" /> {listing.furnished ? "Furnished" : "Unfurnished"}</li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={() => setContact(true)} className="contact-btn">Contact landlord</button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
