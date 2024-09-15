import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlurNavbar.css"; // Ensure that the CSS file is correctly linked
import { useAuth0 } from "@auth0/auth0-react";
import DehazeIcon from "@mui/icons-material/Dehaze";
const BlurNavbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [profileCreated, setProfileCreated] = useState(false);
  useEffect(() => {
    // Check if the profile has been created
    const isProfileCreated = localStorage.getItem("profileCreated") === "true";
    setProfileCreated(isProfileCreated);
  }, []);
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("userEmail", user.email);
    }
  }, [isAuthenticated, user]);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <>
      {/* Logo section */}
      <button onClick={toggleNavbar}>
        <DehazeIcon /> Menu
      </button>

      {/* Overlay for blur effect when navbar is open */}
      <div
        className={`overlay ${isNavbarOpen ? "active" : ""}`}
        onClick={toggleNavbar}
      ></div>

      {/* Navbar container */}
      <div className={`navbar ${isNavbarOpen ? "open" : "closed"}`}>
        <nav>
          {isAuthenticated ? (
            <>
              <button
                onClick={() =>
                  window.open("https://buildstory.streamlit.app/", "_blank")
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                StoryMode
              </button>
              <Link
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </Link>
              <Link
                to="/Title"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Title
              </Link>
              <Link
                to="/Author"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Author
              </Link>
              <Link
                to="/Category"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Category
              </Link>
              {profileCreated ? (
                // If profile is created, show "Profile" link
                <Link
                  to="/profilee"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Profile
                </Link>
              ) : (
                // Otherwise, show "Create Profile" link
                <Link
                  to="/Book_Profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Create Profile
                </Link>
              )}
              <Link
                to="/explore"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Explore
              </Link>
              <button
                onClick={() => {
                  // Clear local storage
                  localStorage.clear();

                  // Proceed with logout
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => loginWithRedirect()}>Log In</button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default BlurNavbar;
