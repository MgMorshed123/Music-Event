const ArtistCard = ({ artist }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition">
      <img
        src={artist.image || "https://via.placeholder.com/150"}
        alt={artist.name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-white text-center">
        {artist.name}
      </h3>
      <p className="text-gray-400 text-center">{artist.bio}</p>
      <p className="text-neon-pink text-center mt-2">
        {artist.followers} Followers
      </p>
    </div>
  );
};

export default ArtistCard;
