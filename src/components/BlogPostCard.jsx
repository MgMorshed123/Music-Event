import { Share2 } from "lucide-react";

const BlogPostCard = ({ post }) => {
  const sharePost = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.content.substring(0, 100),
        url: window.location.href,
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition">
      <img
        src={post.image || "https://via.placeholder.com/300x200"}
        alt={post.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-white">{post.title}</h3>
      <p className="text-gray-400 mb-2">
        By {post.author} | {new Date(post.publishDate).toLocaleDateString()}
      </p>
      <p className="text-gray-300 mb-4">{post.content.substring(0, 1000)}...</p>
      <button
        onClick={sharePost}
        className="text-neon-pink hover:text-neon-pink/80 flex items-center"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share
      </button>
    </div>
  );
};

export default BlogPostCard;
