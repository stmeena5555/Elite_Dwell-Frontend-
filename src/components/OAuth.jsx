import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      let data;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          }
        );

        if (!res.ok) {
          const message = await res.text();
          console.error("❌ Backend error response:", message);
          return;
        }

        try {
          data = await res.json();
        } catch (err) {
          const text = await res.text();
          console.error("❌ Failed to parse JSON. Raw response:", text);
          return;
        }

        dispatch(signInSuccess(data));
        navigate("/");
      } catch (error) {
        console.log("❌ Could not sign in with Google:", error);
      }
    } catch (error) {
      console.log("❌ Google popup failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
