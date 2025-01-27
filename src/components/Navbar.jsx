import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold">PasteApp</h1>
          <img 
            src="data:image/png;base64,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" 
            alt="Logo" 
            className="w-12 h-12 rounded-full"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md ${isActive ? "bg-white text-blue-600" : "hover:text-gray-300"}`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/Paste" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md ${isActive ? "bg-white text-blue-600" : "hover:text-gray-300"}`
            }
          >
            Paste
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-600 flex flex-col space-y-4 py-4 shadow-lg md:hidden">
            <NavLink 
              to="/" 
              className="text-white text-center hover:bg-blue-500 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/Paste" 
              className="text-white text-center hover:bg-blue-500 py-2"
              onClick={() => setIsOpen(false)}
            >
              Paste
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
