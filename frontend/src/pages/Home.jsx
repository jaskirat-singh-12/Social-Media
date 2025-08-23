import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { FaTrash, FaHeart, FaRegComment } from "react-icons/fa";
import Aurora from "../Aurora/Aurora";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    await fetch(`https://social-media-3wo8.onrender.com/api/post/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });

    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  useEffect(() => {
    fetch(`https://social-media-3wo8.onrender.com/api/post`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black ">
      {/* Aurora Background */}
      <Aurora
      className="absolute inset-0 h-[450vh] w-full"
        colorStops={["#C266FF", "#B19EEF", "#775ED9"]}
        blend={0.6}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="flex justify-center pt-4 sm:pt-6 lg:pt-8">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl px-2 sm:px-4 lg:px-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-xl mb-4 sm:mb-6 lg:mb-8 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Top user info */}
                  <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-50">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src="https://i.pravatar.cc/40"
                          alt="User Avatar"
                          className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover mr-3 border-2 border-white shadow-md"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                          {post.username?.username || "Unknown"}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-500">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-2 sm:p-3 rounded-full hover:bg-gray-50 transition-all">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* Post image */}
                  <div className="relative group">
                    <PostCard post={post} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-4 sm:gap-6">
                        <button
                          onClick={() => handleLike(post._id)}
                          className={`flex items-center gap-2 transition-all duration-300 transform hover:scale-110 ${
                            likedPosts.has(post._id)
                              ? "text-red-500"
                              : "text-gray-700 hover:text-red-500"
                          }`}
                        >
                          <FaHeart className="text-lg sm:text-xl md:text-2xl" />
                          <span className="text-xs sm:text-sm md:text-base font-medium hidden sm:inline">
                            {likedPosts.has(post._id) ? "Liked" : "Like"}
                          </span>
                        </button>

                        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
                          <FaRegComment className="text-lg sm:text-xl md:text-2xl" />
                          <span className="text-xs sm:text-sm md:text-base font-medium hidden sm:inline">
                            Comment
                          </span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-gray-500 hover:text-red-500 transition-all duration-300 transform hover:scale-110 p-2 sm:p-3 rounded-full hover:bg-red-50"
                      >
                        <FaTrash className="text-sm sm:text-base md:text-lg" />
                      </button>
                    </div>

                    {/* Likes count */}
                    <div className="mb-2">
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900">
                        {Math.floor(Math.random() * 150) +
                          12 +
                          (likedPosts.has(post._id) ? 1 : 0)}{" "}
                        likes
                      </p>
                    </div>

                    {/* Caption */}
                    <div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-900 break-words leading-relaxed">
                        <span className="font-semibold">
                          {post.user?.username || "User"}
                        </span>{" "}
                        <span className="text-gray-700">{post.caption}</span>
                      </p>
                      <button className="text-xs sm:text-sm md:text-base text-gray-500 hover:text-gray-700 mt-2 transition-colors">
                        View all 24 comments
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  No posts found
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 text-center max-w-sm px-4">
                  Your feed is empty. Start following people or create your first
                  post to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
