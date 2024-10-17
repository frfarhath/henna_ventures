import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to auto-hide the messages after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, [message, error]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(
        "Token from localStorage:",
        token ? "Token exists" : "No token found"
      );

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(
        "http://localhost:8000/api/v1/artist/password/change",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        config
      );
      console.log("Response from backend:", response.data);

      setMessage(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="right-container">
      <div className="main-content">
        <h3 className="font-comic text-2xl mb-[-10px] text-center">
          Change Password
        </h3>
        <br />
        <div className="column-2">
          <div className="sub-row"></div>
          <div className="personalInfo">
            {/* Success message with green background and white text */}
            {message && (
              <div className="bg-green-500 text-white p-3 rounded mb-4">
                {message}
              </div>
            )}
            {/* Error message with red background and white text */}
            {error && (
              <div className="bg-red-500 text-white p-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleChangePassword}>
              <div className="form-floating">
                <label htmlFor="oldPassword">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  placeholder="Current Password"
                  style={{ width: "90%" }}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="form-floating">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="New Password"
                  style={{ width: "90%" }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="form-floating">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  style={{ width: "90%" }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <br />
              <button type="submit" className="save-button">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
