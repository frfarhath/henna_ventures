import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faSignOutAlt,
  faEnvelopeOpenText,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import "../../css/artist.css";

export default function SideBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const handleClickButton1 = () => {
    console.log("artist dashboard button clicked");
    window.location.href = "/artistdashboard";
  };

  const handleClickButton2 = () => {
    console.log("requests button clicked");
    window.location.href = "/requestpage";
  };

  const handleClickButton3 = () => {
    console.log("change password button clicked");
    window.location.href = "/changepassword";
  };

 
  const handleClickButton4 = () => {
    console.log("logout clicked");
    
    // Perform logout logic here, such as clearing session or token
    // Example: Clearing localStorage token
    localStorage.removeItem('token');
  
    // Redirect to login page or any other route
    window.location.href = "/artistlogin"; // Replace with your desired logout route
  };
  
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="sidebar">
          <div className="artist-button-group pb-40">
            <button
              className={`dashboard-button ${
                isActive("/artistdashboard") ? "active" : ""
              }`}
              onClick={handleClickButton1}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" />
              Appointments
            </button>
            <button
              className={`dashboard-button ${
                isActive("/requestpage") ? "active" : ""
              }`}
              onClick={handleClickButton2}
            >
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="fa-icon"
              />{" "}
              Requests
            </button>
            <button
              className={`dashboard-button ${
                isActive("/changepassword") ? "active" : ""
              }`}
              onClick={handleClickButton3}
            >
              <FontAwesomeIcon icon={faUserCog} className="fa-icon" /> Change
              Password
            </button>
            <button
              className={`dashboard-button ${
                isActive("/logout") ? "active" : ""
              }`}
              onClick={handleClickButton4}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" />{" "}
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <button
            className={`nav-button ${
              isActive("/artistdashboard") ? "active" : ""
            }`}
            onClick={handleClickButton1}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" />
            <span>Appointments</span>
          </button>
          <button
            className={`nav-button ${
              isActive("/requestpage") ? "active" : ""
            }`}
            onClick={handleClickButton2}
          >
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              className="fa-icon"
            />
            <span>Requests</span>
          </button>
          <button
            className={`nav-button ${
              isActive("/changepassword") ? "active" : ""
            }`}
            onClick={handleClickButton3}
          >
            <FontAwesomeIcon icon={faUserCog} className="fa-icon" />
            <span>Change Password</span>
          </button>
          <button
            className={`nav-button ${
              isActive("/logout") ? "active" : ""
            }`}
            onClick={handleClickButton4}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </>
  );
}
