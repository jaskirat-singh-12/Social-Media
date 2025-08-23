export default function PostCard({ post }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform max-w-md w-full mx-auto">
      {/* Image */}
      <div className="w-full aspect-[7/5] sm:aspect-[8/4] bg-gray-700">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-300 truncate">
          @{post.user?.username || "unknown"}
        </p>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base break-words text-white">
          {post.caption}
        </p>
      </div>
    </div>
  );
}
