import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [musicReleases, setMusicReleases] = useState([]);
  const [formData, setFormData] = useState({ type: "event", data: {} });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const [eventsRes, blogsRes, podcastsRes, musicRes] = await Promise.all([
          api.get("/events"),
          api.get("/blogs"),
          api.get("/podcasts"),
          api.get("/musics"),
        ]);
        setEvents(eventsRes.data);
        setBlogs(blogsRes.data);
        setPodcasts(podcastsRes.data);
        setMusicReleases(musicRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, data } = formData;
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    try {
      await api.post(`/${type}s`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res = await api.get(`/${type}s`);
      if (type === "event") setEvents(res.data);
      else if (type === "blog") setBlogs(res.data);
      else if (type === "podcast") setPodcasts(res.data);
      else setMusicReleases(res.data);
      setFormData({ type, data: {} });
      e.target.reset();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await api.delete(`/${type}s/${id}`);
      const res = await api.get(`/${type}s`);
      if (type === "event") setEvents(res.data);
      else if (type === "blog") setBlogs(res.data);
      else if (type === "podcast") setPodcasts(res.data);
      else if (type === "music") setMusicReleases(res.data);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const renderForm = () => {
    switch (formData.type) {
      case "event":
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, name: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="date"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, date: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Venue"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, venue: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Time (e.g., 8:00 PM)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, time: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <textarea
              placeholder="Description"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, description: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="number"
              placeholder="Ticket Price"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, ticketPrice: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="number"
              placeholder="Total Tickets"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, totalTickets: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Artist Lineup (comma-separated)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: {
                    ...formData.data,
                    artistLineup: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, posterImage: e.target.files[0] },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
          </>
        );
      case "blog":
        return (
          <>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, title: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <textarea
              placeholder="Content"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, content: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Author"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, author: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, image: e.target.files[0] },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
          </>
        );
      case "podcast":
        return (
          <>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, title: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <textarea
              placeholder="Description"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, description: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Category (e.g., interviews)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, category: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, audio: e.target.files[0] },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
          </>
        );
      case "music":
        return (
          <>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, title: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Artist"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, artist: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="date"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, releaseDate: e.target.value },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, coverImage: e.target.files[0] },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  data: { ...formData.data, audioPreview: e.target.files[0] },
                })
              }
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={formData.type}
              onChange={(e) => setFormData({ type: e.target.value, data: {} })}
              className="bg-gray-700 text-white p-2 rounded-md mb-4 w-full"
            >
              <option value="event">Event</option>
              <option value="blog">Blog</option>
              <option value="podcast">Podcast</option>
              <option value="music">Music Release</option>
            </select>
            {renderForm()}
            <button
              type="submit"
              className="bg-neon-blue text-white px-6 py-3 rounded-full hover:bg-neon-blue/80 w-full"
            >
              Add{" "}
              {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {event.name}
                    </h3>
                    <p className="text-gray-400">
                      {new Date(event.date).toLocaleDateString()} |{" "}
                      {event.venue}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete("event", event._id)}
                    className="text-neon-pink hover:text-neon-pink/80"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400">By {blog.author}</p>
                  </div>
                  <button
                    onClick={() => handleDelete("blog", blog._id)}
                    className="text-neon-pink hover:text-neon-pink/80"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Podcasts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map((podcast) => (
                <div
                  key={podcast._id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {podcast.title}
                    </h3>
                    <p className="text-gray-400">{podcast.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete("podcast", podcast._id)}
                    className="text-neon-pink hover:text-neon-pink/80"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Music Releases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musicReleases.map((music) => (
                <div
                  key={music._id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {music.title}
                    </h3>
                    <p className="text-gray-400">{music.artist}</p>
                  </div>
                  <button
                    onClick={() => handleDelete("music", music._id)}
                    className="text-neon-pink hover:text-neon-pink/80"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
