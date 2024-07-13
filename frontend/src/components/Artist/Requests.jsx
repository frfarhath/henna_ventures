import React, { useState } from "react";
import "../../css/artist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye } from "@fortawesome/free-solid-svg-icons";
import RequestModal from "./RequestModal";

export default function Requests() {
  const initialRequests = [
    {
      id: 1,
      date: "2024-06-10",
      time: "10:00 AM",
      firstname: "Jane",
      lastname: "Smith",
      email: "abcd1234@gmail.com",
      city: "Chilaw",
      contactNumber: "123-456-7890",
      district: "District 1",
      address: "123 Street, City",
      status: "Pending",
      typeofMehendi: "Wedding",
      designCoverage: "Full hand",
      type: "Package",
    },
    {
      id: 2,
      date: "2024-06-11",
      time: "11:00 AM",
      email: "abcd1234@gmail.com",
      firstname: "Jane",
      lastname: "Smith",
      contactNumber: "987-654-3210",
      district: "District 2",
      city: "Chilaw",
      address: "456 Avenue, City",
      status: "Pending",
      typeofMehendi: "Wedding",
      designCoverage: "Full hand",
      type: "Individual",
      mehendifor: "Ahbehde",
      mehendiOn: "efefefef",
    },
    {
      id: 3,
      date: "2024-06-11",
      time: "11:00 AM",
      email: "abcd1234@gmail.com",
      firstname: "Jane",
      lastname: "Smith",
      contactNumber: "987-654-3210",
      district: "District 2",
      city: "Chilaw",
      address: "456 Avenue, City",
      status: "Pending",
      typeofMehendi: "Wedding",
      designCoverage: "Full hand",
      type: "Individual",
      mehendifor: "Ahbehde",
      mehendiOn: "efefefef",
    },
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleCopy = (request) => {
    const dataToCopy = `${request.firstname} | ${request.lastname} | ${request.contactNumber} | ${request.district} | ${request.address}`;
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
      <h3 className="font-comic text-2xl mb-[-10px] text-center">Appointment Requests</h3>
        <table className="timetable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Number</th>
              <th>District</th>
              <th>Address</th>
              <th>View Details</th>
              <th>Status</th>
              <th>Copy</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.date}</td>
                <td>{request.time}</td>
                <td>{request.firstname}</td>
                <td>{request.lastname}</td>
                <td>{request.contactNumber}</td>
                <td>{request.district}</td>
                <td>{request.address}</td>
                <td className="button-container">
                  <button
                    className="copy-button"
                    onClick={() => handleViewRequest(request)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
                <td className="button-container">
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
                <td className="button-container">
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
        {selectedRequest && (
          <RequestModal request={selectedRequest} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
