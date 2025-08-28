const GallerySection = ({ images }) => {
  return (
    <div className="bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Event Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery ${index}`}
              className="w-full h-48 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
