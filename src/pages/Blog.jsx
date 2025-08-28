import { useEffect, useState } from "react";
import api from "../services/api";
import BlogPostCard from "../components/BlogPostCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Music Blog</h1>
          <p className="text-gray-400">
            Stay updated with the latest music news and artist interviews.
          </p>
        </div>
        <div className="space-y-8">
          {filteredBlogs.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
