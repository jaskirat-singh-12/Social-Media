import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { FaTrash, FaHeart, FaRegComment } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });

    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/post`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []));
  }, []);

  return (
    <div className="flex justify-center px-2 sm:px-0 mt-4 sm:mt-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden"
            >
              {/* Top user info */}
              <div className="flex items-center px-4 py-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover mr-3 border"
                />
                <span className="font-semibold text-sm">
                  {post.user?.username || "Unknown"}
                </span>
              </div>

              {/* Post image */}
              <PostCard post={post} />

              {/* Action buttons */}
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex gap-4 text-xl text-gray-800">
                  <FaHeart className="cursor-pointer hover:text-red-500 transition" />
                  <FaRegComment className="cursor-pointer hover:text-blue-500 transition" />
                </div>
                <FaTrash
                  className="text-gray-500 cursor-pointer hover:text-red-500 transition"
                  onClick={() => handleDelete(post._id)}
                />
              </div>

              {/* Caption */}
              <div className="px-4 pb-3">
                <p className="text-sm text-gray-900 break-words">
                  <span className="font-semibold">
                    {post.user?.username || "User"}
                  </span>{" "}
                  {post.caption}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-20">No posts found.</p>
        )}
      </div>
    </div>
  );
}
