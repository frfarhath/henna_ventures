import React, { useCallback, useEffect, useState } from "react";
import "../../css/artist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [isPopUpShow, setIsPopUpShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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
      {isPopUpShow && (
        <MoreDetailsPopUp
          request={selectedRequest}
          setCloseModel={setIsPopUpShow}
        />
      )}
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
              <th>Actions</th>
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
                <td>{request.type_mehendi ?? "N/A"}</td>
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
                <td className="flex">
                  <button
                    className="copy-button"
                    onClick={() => {
                      setSelectedRequest(request);
                      setIsPopUpShow(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
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

const MoreDetailsPopUp = ({ request, setCloseModel }) => {
  return (
    <div
      className="w-screen h-screen bg-black/10 flex justify-center items-center fixed top-0 start-0 backdrop-blur-sm"
      onClick={() => setCloseModel(false)}
    >
      <div
        className="bg-white p-5 rounded-md relative w-fit h-fit min-w-80 sm:min-w-96 shadow-lg drop-shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 end-2"
          onClick={() => setCloseModel(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* details */}
        <div className="flex flex-col gap-y-2">
          <p className="my-0">Date :{request.wedding}</p>
          <p className="my-0">Time : {request.time}</p>
          <p className="my-0">
            Client :{request.firstname}
            {request.lastname}
          </p>
          <p className="my-0">Client Contact :{request.phone}</p>
          <p className="my-0">Mehendi Type :{request.type_mehendi ?? "N/A"}</p>
          <p className="my-0">District :{request.district}</p>
          <p className="my-0">Appointment Type :{request.appointment_type}</p>
          <p className="my-0 capitalize">
            Status :{request.status.toLowerCase()}
          </p>

          <p className="my-0">
            Address :
            {request.appointment_type === "individual" && (
              <span className="">
                {request.address1},{request.address2},{request.city}
              </span>
            )}
            {request.appointment_type === "package" && (
              <span className="">{request.address}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
