
import { useAuth } from "../api/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('/');
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };



  return (
    <nav className="hidden lg:block fixed left-0 top-0 h-screen w-80 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl z-50 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative flex flex-col justify-between h-full py-8 px-6 backdrop-blur-xl">

      {/* Top Logo */}
      <div >
        <Link to="/" className="block mb-16 group">
            <div className="relative">
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-700 drop-shadow-2xl">
                MediaAI
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <p className="text-slate-300 text-sm mt-2 font-medium tracking-wide">Social Media Revolution</p>
            </div>
          </Link>

        {/* Nav Links */}
        <div className="space-y-6">
            <Link
              to="/"
              onClick={() => setActiveTab('/')}
              className={`group flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                activeTab === '/' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/25' 
                  : 'hover:bg-white/10'
              }`}
            >
              <div className={`relative p-3 rounded-xl transition-all duration-300 ${
                activeTab === '/' 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50' 
                  : 'bg-gradient-to-br from-slate-700 to-slate-800 group-hover:from-blue-500 group-hover:to-blue-600'
              }`}>
                <FaHome className="text-xl text-white" />
                {activeTab === '/' && <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>}
              </div>
              <div>
                <span className="text-white text-lg font-semibold tracking-wide">Home</span>
                <p className="text-slate-300 text-sm">Your social feed</p>
              </div>
            </Link>

            <Link
              to="/create"
              onClick={() => setActiveTab('/create')}
              className={`group flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                activeTab === '/create' 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 shadow-lg shadow-green-500/25' 
                  : 'hover:bg-white/10'
              }`}
            >
              <div className={`relative p-3 rounded-xl transition-all duration-300 ${
                activeTab === '/create' 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50' 
                  : 'bg-gradient-to-br from-slate-700 to-slate-800 group-hover:from-green-500 group-hover:to-green-600'
              }`}>
                <FaPlusSquare className="text-xl text-white" />
                {activeTab === '/create' && <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>}
              </div>
              <div>
                <span className="text-white text-lg font-semibold tracking-wide">Create</span>
                <p className="text-slate-300 text-sm">Upload new content</p>
              </div>
            </Link>
          </div>
        </div>

      {!user ? (
        <Link
          to="/login"
          className="flex items-center gap-4 text-lg text-blue-600 hover:text-blue-800 transition"
        >
          <FaSignOutAlt className="text-2xl" />
          <span>Login</span>
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-lg text-red-600 hover:text-red-800 transition"
        >
          <FaSignOutAlt className="text-2xl" />
          <span>Logout</span>
        </button>
      )}
      </div>
    </nav>
  );
}
