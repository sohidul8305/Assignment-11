import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [fullUser, setFullUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    // Backend থেকে complete user info fetch
    axios
      .get(`http://localhost:4000/users?email=${user.email}`)
      .then((res) => {
        setFullUser(res.data || {});
      })
      .catch((err) => {
        console.error(err);
        setFullUser({});
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged out!",
              "You have been logged out successfully.",
              "success"
            );
            navigate("/login");
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error(err);
          });
      }
    });
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Name:</strong> {user?.displayName || fullUser?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || fullUser?.email || "N/A"}
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
