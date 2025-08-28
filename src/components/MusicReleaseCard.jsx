import { Play, Pause } from "lucide-react";

const MusicReleaseCard = ({ track, currentlyPlaying, playTrack }) => {
  const isPlaying = currentlyPlaying === track._id;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition">
      <img
        src={track.coverImage || "https://via.placeholder.com/150"}
        alt={track.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-white">{track.title}</h3>
      <p className="text-gray-400">{track.artist}</p>
      <p className="text-gray-400 mb-4">
        {new Date(track.releaseDate).toLocaleDateString()}
      </p>
      <button
        onClick={() => playTrack(track._id)}
        className="bg-neon-green text-white px-4 py-2 rounded-full hover:bg-neon-green/80 flex items-center"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 mr-2" />
        ) : (
          <Play className="w-5 h-5 mr-2" />
        )}
        {isPlaying ? "Pause" : "Play Preview"}
      </button>
      {isPlaying && track.audioPreviewUrl && (
        <audio
          autoPlay
          src={track.audioPreviewUrl}
          className="mt-4 w-full"
          controls
        />
      )}
    </div>
  );
};

export default MusicReleaseCard;
