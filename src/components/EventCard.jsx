import { Calendar, MapPin, Users } from "lucide-react";

const EventCard = ({ event, setSelectedEvent }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition">
      <img
        src={event.posterImage || "https://via.placeholder.com/300x200"}
        alt={event.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-white">{event.name}</h3>
      <div className="flex items-center text-gray-400 mb-2">
        <Calendar className="w-5 h-5 mr-2" />
        <p>{new Date(event.date).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center text-gray-400 mb-2">
        <MapPin className="w-5 h-5 mr-2" />
        <p>{event.venue}</p>
      </div>
      <div className="flex items-center text-gray-400 mb-2">
        <Users className="w-5 h-5 mr-2" />
        <p>{event.availableTickets} tickets available</p>
      </div>
      <p className="text-gray-300 mb-4">
        {event.description.substring(0, 100)}...
      </p>
      <p className="text-gray-300 mb-4">
        Artists: {event.artistLineup.join(", ")}
      </p>
      <button
        onClick={() => setSelectedEvent(event)}
        className="bg-neon-blue text-white px-4 py-2 rounded-full hover:bg-neon-blue/80"
      >
        Buy Tickets (${event.ticketPrice})
      </button>
    </div>
  );
};

export default EventCard;
