// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const logout = async () => {
//     await fetch("http://localhost:3000/auth/logout", {
//       method: "GET",
//       credentials: "include",
//     });
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg backdrop-blur-md">
//       {/* Logo */}
//       <Link
//         to="/"
//         className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-transparent bg-clip-text hover:scale-105 transition-transform"
//       >
//         MediaAI
//       </Link>

//       {/* Nav Links */}
//       <div className="flex gap-4 items-center">
//         {/* Home Button */}
//         <Link
//           to="/"
//           className="relative px-5 py-2 rounded-full font-semibold text-white
//             bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
//             shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
//         >
//           🏠 Home
//         </Link>

//         {/* Upload Button */}
//         <Link
//           to="/create"
//           className="relative px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
//             text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105
//             transition-all duration-300"
//         >
//           ⬆ Upload
//         </Link>

//         {/* Logout Button */}
//         <button
//           onClick={logout}
//           className="px-7 py-2 rounded-full bg-gradient-to-r from-red-500 via-pink-600 to-purple-600
//             text-white font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105
//             transition-all duration-300"
//         >
//           🚪 Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(false);

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "GET", 
      credentials: "include",
    });

    navigate("/login");
  };


  useEffect(() => {
  fetch("http://localhost:3000/auth/user", {
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
