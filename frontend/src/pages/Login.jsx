import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      navigate("/");
      toast.success("Login successful!");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-pink-500 py-2 rounded hover:bg-pink-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
