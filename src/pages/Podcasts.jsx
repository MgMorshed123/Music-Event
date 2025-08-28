import { useEffect, useState } from "react";
import api from "../services/api";
import PodcastCard from "../components/PodcastCard";

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [category, setCategory] = useState("all");
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const categories = ["all", "interviews", "behind-the-scenes", "new releases"];

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await api.get("/podcasts");
        setPodcasts(res.data);
        setFilteredPodcasts(res.data);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      }
    };
    fetchPodcasts();
  }, []);

  useEffect(() => {
    setFilteredPodcasts(
      category === "all"
        ? podcasts
        : podcasts.filter((p) => p.category === category)
    );
  }, [category, podcasts]);

  const playPodcast = (id) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Podcasts</h1>
          <p className="text-gray-400">
            Listen to exclusive interviews and music discussions.
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full ${
                  category === cat
                    ? "bg-neon-blue text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {filteredPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              podcast={podcast}
              currentlyPlaying={currentlyPlaying}
              playPodcast={playPodcast}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
