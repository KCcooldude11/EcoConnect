import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

  const [isLogin, setIsLogin] = useState(mode !== "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(mode !== "signup");
  }, [mode]);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        await setDoc(doc(db, "users", userId), {
          email,
          firstName,
          lastName,
          location: locationCity,
          createdAt: new Date(),
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAuth();
          }}
          autoComplete="off"
        >
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 mb-4 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 mb-4 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="City"
                className="w-full p-3 mb-4 border rounded"
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            className="w-full p-3 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-full p-3 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full bg-red-500 text-white py-2 mt-3 rounded hover:bg-red-600"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-700 underline"
          >
            {isLogin ? "Sign up here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
