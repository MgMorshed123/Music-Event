import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAppContext } from "../App";

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", page: "home" },
    { name: "Events", path: "/events", page: "events" },
    { name: "Blog", path: "/blog", page: "blog" },
    { name: "Podcasts", path: "/podcasts", page: "podcasts" },
    ...(user?.role === "admin"
      ? [{ name: "Admin", path: "/admin", page: "admin" }]
      : []),
    ...(user ? [] : [{ name: "Login", path: "/login", page: "login" }]),
  ];

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-neon-pink">Music Brand</div>
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setCurrentPage(link.page)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === link.page
                    ? "bg-neon-blue text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  setCurrentPage(link.page);
                  toggleMenu();
                }}
                className="block px-3 py-2 text-gray-300 hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block px-3 py-2 text-gray-300 hover:bg-gray-700 flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
