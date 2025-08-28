import { useEffect, useState } from "react";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import CountdownTimer from "../components/CountdownTimer";
import EventCard from "../components/EventCard";
import ArtistCard from "../components/ArtistCard";
import MusicReleaseCard from "../components/MusicReleaseCard";
import GallerySection from "../components/GallerySection";

const Home = ({
  setCurrentPage,
  setSelectedEvent,
  currentlyPlaying,
  playTrack,
}) => {
  const [events, setEvents] = useState([]);
  const [musicReleases, setMusicReleases] = useState([]);

  const artists = [
    {
      id: 1,
      name: "DJ Nexus",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Electronic music producer",
      followers: "2.3M",
    },
    {
      id: 2,
      name: "Luna Vox",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      bio: "Pop sensation",
      followers: "1.8M",
    },
    {
      id: 3,
      name: "Rasta Road",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      bio: "Reggae icon",
      followers: "1.2M",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1721133073235-e4b5facb27fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=200&fit=crop",
  ];

  useEffect(() => {
    setCurrentPage("home");
    const fetchData = async () => {
      try {
        const [eventsRes, musicRes] = await Promise.all([
          api.get("/events"),
          api.get("/musics"),
        ]);
        setEvents(eventsRes.data);
        setMusicReleases(musicRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [setCurrentPage]);

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection setCurrentPage={setCurrentPage} />
      <CountdownTimer />
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Events
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don’t miss out on our upcoming shows featuring top artists.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                setSelectedEvent={setSelectedEvent}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Popular Artists
            </h2>
            <p className="text-gray-400">
              Meet the talented artists making our events unforgettable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Latest Releases
            </h2>
            <p className="text-gray-400">
              Fresh tracks from our featured artists.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {musicReleases.map((track) => (
              <MusicReleaseCard
                key={track._id}
                track={track}
                currentlyPlaying={currentlyPlaying}
                playTrack={playTrack}
              />
            ))}
          </div>
        </div>
      </section>
      <GallerySection images={galleryImages} />
    </div>
  );
};

export default Home;
