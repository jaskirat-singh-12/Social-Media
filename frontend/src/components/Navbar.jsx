

import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(false);

  const logout = async () => {
    await fetch(`https://social-media-3wo8.onrender.com/auth/logout`, {
      method: "GET", 
      credentials: "include",
    });

    navigate("/login");
  };


  useEffect(() => {
  fetch(`https://social-media-3wo8.onrender.com/auth/user`, {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) setToken(true);
      else setToken(false);
    });
}, []);


  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      {/* Top Logo */}
      <div>
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900 mb-8 block px-2"
        >
          MediaAI
        </Link>

        {/* Nav Links */}
        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="flex items-center gap-4 text-lg text-gray-800 hover:text-black transition"
          >
            <FaHome className="text-2xl" />
            <span>Home</span>
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-4 text-lg text-gray-800 hover:text-black transition"
          >
            <FaPlusSquare className="text-2xl" />
            <span>Upload</span>
          </Link>
        </div>
      </div>

      {/* Logout at bottom */}
      {!token ? (
        <Link
          to="/login"
          className="flex items-center gap-4 text-lg text-blue-600 hover:text-blue-800 transition"
        >
          <FaSignOutAlt className="text-2xl" />
          <span>Login</span>
        </Link>
      ) : (
        <button
          onClick={logout}
          className="flex items-center gap-4 text-lg text-red-600 hover:text-red-800 transition"
        >
          <FaSignOutAlt className="text-2xl" />
          <span>Logout</span>
        </button>
      )}
    </nav>
  );
}
