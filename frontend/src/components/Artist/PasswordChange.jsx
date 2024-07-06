import React, { useState } from "react";
import "../../css/artist.css";
import axios from "axios";

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      console.log("Token from localStorage:", token);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        "http://localhost:8000/api/v1/artist/password/change", // Make sure this matches your backend route
        { oldPassword: currentPassword, password: newPassword, confirmPassword },
        config
      );
      

      console.log("Response from backend:", response.data);

      setMessage(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="right-container">
      <div className="main-content">
        <h3>Change Password</h3>
        <br />
        <div className="column-2">
          <div className="sub-row"></div>
          <div className="personalInfo">
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleChangePassword}>
              <div className="form-floating">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  placeholder="Current Password"
                  style={{ width: "90%" }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
