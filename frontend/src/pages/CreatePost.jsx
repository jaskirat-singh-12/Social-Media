
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`https://social-media-3wo8.onrender.com/api/post`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Upload successful!");
      setCaption(data.post.caption);
      setImage(null);
    } else {
      toast.error(data.message || "Upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl text-center space-y-6">
        <h2 className="text-3xl font-extrabold tracking-wide">🎵 Upload Your Song</h2>

        {/* Upload area */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-2xl p-12 hover:border-pink-500 hover:bg-pink-500/20 transition duration-300 ease-in-out group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mb-4 text-pink-500 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l8-8 8 8M12 4v12"
            />
          </svg>
          <span className="text-gray-300 text-lg">
            {image ? image.name : (
              <>
                Drag & Drop or <span className="text-pink-500 font-bold">Browse</span>
              </>
            )}
          </span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={loading}
          />
        </label>

        {/* Upload button */}
        <button
          type="submit"
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-full font-bold shadow-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
            transition-transform duration-300 ease-out
            ${loading ? "cursor-not-allowed opacity-70" : "hover:scale-105 hover:shadow-pink-500/50"}`}
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Uploading...</span>
            </span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="inline w-5 h-5 mr-2"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5V13h14V10.4a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2.6a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3.5 3.5a.5.5 0 0 1-.708.708L8.5 2.707V10.5a.5.5 0 0 1-1 0V2.707L4.854 5.354a.5.5 0 1 1-.708-.708l3.5-3.5z" />
              </svg>
              Upload
            </>
          )}
        </button>

        {/* Caption display (optional) */}
        {caption && (
          <div className="mt-4 p-4 bg-white/20 rounded-lg text-gray-200 break-words">
            <p className="font-semibold mb-1">AI Caption:</p>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
