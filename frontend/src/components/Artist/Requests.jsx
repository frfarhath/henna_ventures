import React, { useState } from "react";
import "../../css/artist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function Requests() {
  const initialRequests = [
    {
      id: 1,
      date: "2024-06-10",
      time: "10:00 AM",
      clientName: "John Doe",
      contactNumber: "123-456-7890",
      mehendiType: "Bridal",
      district: "District 1",
      address: "123 Street, City",
      status: "Pending",
    },
    {
      id: 2,
      date: "2024-06-11",
      time: "11:00 AM",
      clientName: "Jane Smith",
      contactNumber: "987-654-3210",
      mehendiType: "Traditional",
      district: "District 2",
      address: "456 Avenue, City",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-06-11",
      time: "11:00 AM",
      clientName: "Jane Smith",
      contactNumber: "987-654-3210",
      mehendiType: "Traditional",
      district: "District 2",
      address: "456 Avenue, City",
      status: "Pending",
    },
    // Add more initial requests here
  ];

  const [requests, setRequests] = useState(initialRequests);

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "status-accepted";
      case "Declined":
        return "status-declined";
      case "Completed":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  const handleCopy = (request) => {
    const dataToCopy = `${request.clientName} | ${request.contactNumber} | ${request.mehendiType} | ${request.district} | ${request.address}`;
    navigator.clipboard.writeText(dataToCopy).then(
      () => {
        alert("Data copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="right-container">
      <div className="main-content">
        <h3>Appointment Requests</h3>
        <table className="timetable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Client Name</th>
              <th>Contact Number</th>
              <th>Mehendi Type</th>
              <th>District</th>
              <th>Address</th>
              <th>Status</th>
              <th>Copy</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.date}</td>
                <td>{request.time}</td>
                <td>{request.clientName}</td>
                <td>{request.contactNumber}</td>
                <td>{request.mehendiType}</td>
                <td>{request.district}</td>
                <td>{request.address}</td>
                <td>
                  <select
                    className={`status-dropdown ${getStatusClass(
                      request.status
                    )}`}
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
                    <option value="Declined">Declined</option>
                  </select>
                </td>
                <td>
                  <button
                    className="copy-button"
                    onClick={() => handleCopy(request)}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
