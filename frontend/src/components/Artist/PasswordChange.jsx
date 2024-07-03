import React, { useState, useEffect } from "react";
import "../../css/artist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function PasswordChange() {
  return (
    <div className="right-container">
      <div className="main-content">
        <h3>Change Password</h3>
        <br />
        <div className="column-2">
          <div className="sub-row"></div>
          <div className="personalInfo">
            <div className="form-floating">
              <label htmlFor="floatingPassword">Current Password</label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Current Password"
                style={{ width: "90%" }}
              />
            </div>
            <br />
            <div className="form-floating">
              <label htmlFor="floatingPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="New Password"
                style={{ width: "90%" }}
              />
            </div>
            <br />
            <div className="form-floating">
              <label htmlFor="floatingPassword">Confirm Password</label>

              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Confirm Password"
                style={{ width: "90%" }}
              />
            </div>

            <button className="save-button">Save changes </button>
          </div>
        </div>
      </div>
    </div>
  );
}
