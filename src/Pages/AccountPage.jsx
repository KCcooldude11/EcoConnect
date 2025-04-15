import { useEffect, useState } from "react";
import { useAuth } from "../Components/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AccountPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setProfile(snapshot.data());
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">You must be logged in to view this page.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Account Info</h1>

        <p><strong>Email:</strong> {user.email}</p>

        {profile?.firstName && (
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        )}

        {profile?.location && (
          <p><strong>Location:</strong> {profile.location}</p>
        )}

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="User"
            className="mt-4 rounded-full w-24 h-24 object-cover mx-auto"
          />
        )}
      </div>
    </div>
  );
}
