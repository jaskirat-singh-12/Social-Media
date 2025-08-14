import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
     const timer = setTimeout(() => setLoading(false), 3000); // Simulate API call
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {loading ? (

      
    <Loader />
    ) :(

    <BrowserRouter>
      <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
    )
    
    }
    </>
  );
}
