import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Music Brand</h3>
            <p className="text-gray-400">
              Bringing you the best in music and events.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setCurrentPage("home")}
                  className="text-gray-400 hover:text-neon-pink"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  onClick={() => setCurrentPage("events")}
                  className="text-gray-400 hover:text-neon-pink"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setCurrentPage("blog")}
                  className="text-gray-400 hover:text-neon-pink"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/podcasts"
                  onClick={() => setCurrentPage("podcasts")}
                  className="text-gray-400 hover:text-neon-pink"
                >
                  Podcasts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-pink">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-pink">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-pink">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-8">
          © 2025 Music Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
