import { Play, Pause } from "lucide-react";

const PodcastCard = ({ podcast, currentlyPlaying, playPodcast }) => {
  const isPlaying = currentlyPlaying === podcast._id;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition">
      <h3 className="text-xl font-bold text-white">{podcast.title}</h3>
      <p className="text-gray-400 mb-2">{podcast.category}</p>
      <p className="text-gray-300 mb-4">
        {podcast.description?.substring(0, 100)}...
      </p>
      <button
        onClick={() => playPodcast(podcast._id)}
        className="bg-neon-green text-white px-4 py-2 rounded-full hover:bg-neon-green/80 flex items-center"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 mr-2" />
        ) : (
          <Play className="w-5 h-5 mr-2" />
        )}
        {isPlaying ? "Pause" : "Play"}
      </button>
      {isPlaying && podcast.audioUrl && (
        <audio
          autoPlay
          src={podcast.audioUrl}
          className="mt-4 w-full"
          controls
        />
      )}
    </div>
  );
};

export default PodcastCard;
