import { Link } from "react-router-dom";
import { Music } from "lucide-react";

const HeroSection = ({ setCurrentPage }) => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Music className="w-16 h-16 mx-auto text-neon-pink mb-4" />
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Music Brand
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Experience unforgettable events and discover the latest music
          releases.
        </p>
        <div className="space-x-4">
          <Link
            to="/events"
            onClick={() => setCurrentPage("events")}
            className="inline-block bg-neon-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-neon-blue/80"
          >
            Explore Events
          </Link>
          <Link
            to="/podcasts"
            onClick={() => setCurrentPage("podcasts")}
            className="inline-block bg-neon-pink text-white px-6 py-3 rounded-full font-semibold hover:bg-neon-pink/80"
          >
            Listen to Podcasts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
