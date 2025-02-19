import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for opening/closing the sidebar
import './sidebar.css'; // Add your CSS for styling

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filter the sidebar links based on the search query
  const sidebarLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Patients', path: '/patients' },
    { name: 'Settings', path: '/settings' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/logout' },
  ];

  const filteredLinks = sidebarLinks.filter(link =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Button to open/close sidebar */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        {/* Search Bar */}
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sidebar-search-input"
          />
        </div>

        {/* Sidebar Links */}
        <ul className="sidebar-links">
          {filteredLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
