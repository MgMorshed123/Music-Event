import { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Podcasts from "./pages/Podcasts";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Login";
import TicketModalWithStripe from "./components/TicketModal";
import TicketConfirmation from "./components/TicketConfirmation";
import Footer from "./components/Footer";
import Register from "./pages/Register";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// App.jsx
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [showTicketConfirmation, setShowTicketConfirmation] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [user, setUser] = useState(null);

  const [fetchEvents, setFetchEvents] = useState(null); // ✅ add this

  const playTrack = (id) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id);
  };

  const handleTicketPurchase = async () => {
    if (fetchEvents) {
      await fetchEvents(); // ✅ refresh events after purchase
    }
    setShowTicketConfirmation(true);
    setTimeout(() => {
      setShowTicketConfirmation(false);
      setSelectedEvent(null);
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setCurrentPage={setCurrentPage}
                  setSelectedEvent={setSelectedEvent}
                  currentlyPlaying={currentlyPlaying}
                  playTrack={playTrack}
                />
              }
            />
            <Route
              path="/events"
              element={
                <Events
                  setSelectedEvent={setSelectedEvent}
                  setFetchEvents={setFetchEvents} // ✅ pass setter
                />
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <TicketModalWithStripe
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            handleTicketPurchase={handleTicketPurchase} // ✅ now calls fetchEvents
            ticketQuantity={ticketQuantity}
            setTicketQuantity={setTicketQuantity}
          />
          <TicketConfirmation
            show={showTicketConfirmation}
            selectedEvent={selectedEvent}
            ticketQuantity={ticketQuantity}
          />

          <Footer setCurrentPage={setCurrentPage} />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
