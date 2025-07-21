
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import "./Search.css"; // Custom CSS

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) setShowMore(true);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) setShowMore(false);
    setListings([...listings, ...data]);
  };

  return (
    <div className="search-container">
      <div className="search-sidebar">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="form-group">
            <label>Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              className="form-input"
              value={sidebardata.searchTerm}
              onChange={handleChange}
              placeholder="Search..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>Type:</label>
            <label>
              <input type="checkbox" id="all" checked={sidebardata.type === "all"} onChange={handleChange} /> Rent & Sale
            </label>
            <label>
              <input type="checkbox" id="rent" checked={sidebardata.type === "rent"} onChange={handleChange} /> Rent
            </label>
            <label>
              <input type="checkbox" id="sale" checked={sidebardata.type === "sale"} onChange={handleChange} /> Sale
            </label>
            <label>
              <input type="checkbox" id="offer" checked={sidebardata.offer} onChange={handleChange} /> Offer
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>Amenities:</label>
            <label>
              <input type="checkbox" id="parking" checked={sidebardata.parking} onChange={handleChange} /> Parking
            </label>
            <label>
              <input type="checkbox" id="furnished" checked={sidebardata.furnished} onChange={handleChange} /> Furnished
            </label>
          </div>

          <div className="form-group">
            <label>Sort:</label>
            <select id="sort_order" onChange={handleChange} defaultValue="created_at_desc">
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="search-button">Search</button>
        </form>
      </div>

      <div className="search-results">
        <h1 className="results-title">Listing Results:</h1>
        <div className="results-list">
          {loading && <p>Loading...</p>}
          {!loading && listings.length === 0 && <p>No listing found!</p>}
          {!loading && listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
          {showMore && (
            <button onClick={onShowMoreClick} className="show-more-button">
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
