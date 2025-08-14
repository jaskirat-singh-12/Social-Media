import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-500 animate-gradient" />

      {/* Center Loader */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Instagram Circle Pulse */}
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Loading text */}
        <motion.p
          className="mt-4 text-white text-lg font-bold tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>

      {/* Background Gradient Animation */}
      <style jsx>{`
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientMove 5s ease infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
