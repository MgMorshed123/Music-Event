// Events.jsx
import { useState, useEffect } from "react";
import api from "../services/api";

const Events = ({ setSelectedEvent, setFetchEvents }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events.");
    }
  };

  useEffect(() => {
    fetchEvents();
    setFetchEvents(() => fetchEvents); // Expose fetchEvents to parent
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {error && (
        <p className="text-red-500 text-center font-medium bg-red-100/20 rounded-lg p-3 mb-6">
          {error}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Event Poster */}
            <img
              src={event.posterImage}
              alt={`${event.name} poster`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            {/* Event Name */}
            <h3 className="text-xl font-semibold text-white mb-2">
              {event.name}
            </h3>
            {/* Event Date and Time */}
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Time:</span>{" "}
              {event.time.includes(":") ? event.time : `${event.time}:00 PM`}
            </p>
            {/* Venue */}
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Venue:</span> {event.venue}
            </p>
            {/* Artist Lineup */}
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Artists:</span>{" "}
              {event.artistLineup.join(", ")}
            </p>
            {/* Description */}
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {event.description}
            </p>
            {/* Ticket Info */}
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Ticket Price:</span> $
              {event.ticketPrice}
            </p>
            <p className="text-gray-300 text-sm mb-3">
              <span className="font-medium">Tickets Available:</span>{" "}
              {event.availableTickets} / {event.totalTickets}
            </p>
            {/* Buy Ticket Button */}
            <button
              onClick={() => setSelectedEvent(event)}
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Buy Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
