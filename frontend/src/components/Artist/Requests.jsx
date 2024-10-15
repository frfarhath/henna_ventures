import React, { useCallback, useEffect, useState } from "react";
import "../../css/artist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const getStatusClass = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "status-accepted";
      case "DECLINED":
        return "status-declined";
      case "COMPLETED":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  const changeStatus = async (id, status, type) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .put(
        `http://localhost:8000/api/v1/artist/appointments/${id}`,
        { status, type },
        config
      )
      .then(() => {
        alert("Status updated successfully");
      })
      .then(() => getRequestAppointments())
      .catch(() => {
        alert("Error fetching appointments");
      });
  };

  const getRequestAppointments = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get("http://localhost:8000/api/v1/artist/appointments", config)
      .then(({ data }) => {
        setRequests(data.appointments);
      })
      .catch(() => {
        alert("Error fetching appointments");
      });
  }, []);

  useEffect(() => {
    getRequestAppointments();
  }, [getRequestAppointments]);

  const handleCopy = (request) => {
    const address =
      request.appointment_type === "individual"
        ? `${request.address1}, ${request.address2}, ${request.city}`
        : `${request.address}`;
    const dataToCopy = `${request.firstname} ${request.lastname} | ${request.phone} | ${request.type_mehendi} | ${request.district} | ${address}`;
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
        <h3 className="font-comic text-2xl mb-8 text-center">
          Appointment Requests
        </h3>
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
              <tr key={request._id}>
                <td>{request.wedding}</td>
                <td>{request.time}</td>
                <td>
                  {request.firstname}
                  {request.lastname}
                </td>
                <td>{request.phone}</td>
                <td>{request.type_mehendi}</td>
                <td>{request.district}</td>
                <td>
                  {request.appointment_type === "individual" && (
                    <span className="">
                      {request.address1},{request.address2},{request.city}
                    </span>
                  )}
                  {request.appointment_type === "package" && (
                    <span className="">{request.address}</span>
                  )}
                </td>
                <td>
                  <select
                    className={`status-dropdown ${getStatusClass(
                      request.status
                    )}`}
                    value={request.status}
                    onChange={(e) =>
                      changeStatus(
                        request._id,
                        e.target.value,
                        request.appointment_type
                      )
                    }
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="DECLINED">Declined</option>
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
