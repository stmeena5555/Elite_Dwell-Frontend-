

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import "./Home.css"; 
import Footer from "./footer"; 
import './Footer.css';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        if (!res.ok) throw new Error("Failed to fetch offer listings");
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.error("Offer listings error:", error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        if (!res.ok) throw new Error("Failed to fetch rent listings");
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.error("Rent listings error:", error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        if (!res.ok) throw new Error("Failed to fetch sale listings");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error("Sale listings error:", error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-heading">
          Find your next <span style={{ color: "#64748b" }}>Perfect</span>
          <br />
          place with ease
        </h1>
        <div className="hero-subtext">
          Real Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to="/search" className="hero-link">
          Let's get started...
        </Link>
      </div>

      {/* Swiper Slider */}
      {offerListings.length > 0 && (
        <Swiper navigation>
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="slider-image"
                style={{ backgroundImage: `url(${listing.imageUrls[0]})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Listings */}
      <div className="listing-section">
        {offerListings.length > 0 && (
          <div>
            <div className="listing-header">
              <h2 className="listing-title">Recent offers</h2>
              <Link to="/search?offer=true" className="listing-link">
                Show more offers
              </Link>
            </div>
            <div className="listing-grid">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings.length > 0 && (
          <div>
            <div className="listing-header">
              <h2 className="listing-title">Recent places for rent</h2>
              <Link to="/search?type=rent" className="listing-link">
                Show more places for rent
              </Link>
            </div>
            <div className="listing-grid">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings.length > 0 && (
          <div>
            <div className="listing-header">
              <h2 className="listing-title">Recent places for sale</h2>
              <Link to="/search?type=sale" className="listing-link">
                Show more places for sale
              </Link>
            </div>
            <div className="listing-grid">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Footer Section */}
      <Footer />
    </div>
  );
}
