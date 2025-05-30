import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user info if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:5002/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAvatarClick = () => setShowDropdown((v) => !v);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const target = document.getElementById("opportunities");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Logo />
        <div className="flex items-center space-x-6">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {/* <Link to="/jobs" className="nav-link">Opportunities</Link>
          <ThemeToggle /> */}

          <a
            href="#opportunities"
            className="nav-link"
            onClick={handleSmoothScroll}
          >
            Opportunities
          </a>

          <div className="relative" ref={dropdownRef}>
            <button className="avatar-btn" onClick={handleAvatarClick}>
              <img
                src={
                  user?.avatar ||
                  "https://randomuser.me/api/portraits/lego/1.jpg"
                }
                alt="profile"
                className="avatar-img"
              />
            </button>
            {showDropdown && (
              <div
                className={`dropdown-menu${isOpen ? " mobile-dropdown" : ""}`}
              >
                <div className="dropdown-profile">
                  <img
                    src={
                      user?.avatar ||
                      "https://randomuser.me/api/portraits/lego/1.jpg"
                    }
                    alt="profile"
                    className="dropdown-avatar"
                  />
                  <div>
                    <div className="dropdown-name">{user?.name || "User"}</div>
                    <div className="dropdown-email">{user?.email || ""}</div>
                  </div>
                </div>

                <button
  className="dropdown-dashboard"
  onClick={() => {
    setShowDropdown(false);
    navigate("/dashboard");
  }}
>
  Go to Dashboard
</button>

                <button className="dropdown-dashboard" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu md:hidden">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="mobile-nav-link"
            onClick={() => setIsOpen(false)}
          >
            Opportunities
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
