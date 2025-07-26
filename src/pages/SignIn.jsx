import { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Important for cookies (auth token)
          body: JSON.stringify(formData),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (err) {
        const raw = await res.text();
        console.error("❌ Failed to parse JSON. Raw response:", raw);
        dispatch(signInFailure("Invalid response from server"));
        return;
      }

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data?.message || "Sign in failed"));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="signin-input"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="signin-input"
        />
        <button disabled={loading} className="signin-button">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="signin-footer">
        <p>Don’t have an account?</p>
        <Link to="/sign-up" className="signin-link">Sign up</Link>
      </div>

      {error && <p className="signin-error">{error}</p>}
    </div>
  );
}
