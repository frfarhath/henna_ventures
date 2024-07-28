import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../css/artist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const initialAppointments = [
  {
    id: 1,
    date: "2024-05-29",
    time: "8:00 AM",
    details: "Jane Smith | 987-654-3210 | Traditional | District 2 | 456 Avenue, City",
  },
  {
    id: 2,
    date: "2024-05-29",
    time: "10:00 AM",
    details: "John Doe | 123-456-7890 | Modern | District 1 | 123 Street, City",
  },
  {
    id: 3,
    date: "2024-05-30",
    time: "2:00 PM",
    details: "Client C | 111-222-3333 | Contemporary | District 3 | 789 Road, City",
  },
];

export default function Appointments({ selectedDate }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [newAppointment, setNewAppointment] = useState({
    time: "",
    details: "",
  });
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({
    id: null,
    time: "",
    details: "",
  });

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const dailyAppointments = appointments.filter(
      (app) => app.date === formattedDate
    );
    setDailyAppointments(dailyAppointments);
  }, [selectedDate, appointments]);

  const handleAddAppointment = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const newId = appointments.length
      ? appointments[appointments.length - 1].id + 1
      : 1;
    const newApp = {
      id: newId,
      date: formattedDate,
      time: newAppointment.time,
      details: newAppointment.details,
    };
    setAppointments([...appointments, newApp]);
    setNewAppointment({ time: "", details: "" });
  };

  const handleDeleteAppointment = (id) => {
    const updatedAppointments = appointments.filter((app) => app.id !== id);
    setAppointments(updatedAppointments);
  };

  const handleUpdateAppointment = (appointment) => {
    setCurrentAppointment(appointment);
    setModalIsOpen(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedAppointments = appointments.map((app) =>
      app.id === currentAppointment.id ? currentAppointment : app
    );
    setAppointments(updatedAppointments);
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAppointment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const parseDetails = (details) => {
    const parts = details.split(" | ");
    return {
      clientName: parts[0] || "",
      contactNumber: parts[1] || "",
      mehendiType: parts[2] || "",
      district: parts[3] || "",
      address: parts[4] || "",
    };
  };

  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    const time = new Date(0, 0, 0, hour).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const appointment = dailyAppointments.find((app) => app.time === time);
    const parsedDetails = appointment ? parseDetails(appointment.details) : {};

    timeSlots.push(
      <tr key={time}>
        <td className="time-slot">{time}</td>
        <td className="appointment-details">{parsedDetails.clientName}</td>
        <td className="appointment-details">{parsedDetails.contactNumber}</td>
        <td className="appointment-details">{parsedDetails.mehendiType}</td>
        <td className="appointment-details">{parsedDetails.district}</td>
        <td className="appointment-details">{parsedDetails.address}</td>
        <td className="appointment-details">
          {appointment && (
            <>
              <div className="button-manage">
                <button
                  className="action-buttons delete-button"
                  onClick={() => handleDeleteAppointment(appointment.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                  className="action-buttons update-button"
                  onClick={() => handleUpdateAppointment(appointment)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </>
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="right-container">
      <div className="main-content">
        <h3>
          Confirmed Appointments for {selectedDate.toISOString().split("T")[0]}
        </h3>
        <div className="add-appointment">
          <input
            type="time"
            value={newAppointment.time}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, time: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Appointment Details"
            value={newAppointment.details}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, details: e.target.value })
            }
          />
          <button onClick={handleAddAppointment}>
            <FontAwesomeIcon icon={faPlus} /> Add Appointment
          </button>
        </div>
        <table className="timetable">
          <thead>
            <tr>
              <th>Time</th>
              <th>Client Name</th>
              <th>Contact Number</th>
              <th>Mehendi Type</th>
              <th>District</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{timeSlots}</tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Appointment"
        className="modal"
        overlayClassName="overlay"
      >
        <h3>Edit Appointment</h3>
        <br />
        <form onSubmit={handleSaveChanges}>
          <label>
            Time:
            <br />
            <input
              type="time"
              name="time"
              value={currentAppointment.time}
              onChange={handleChange}
            />
          </label>
          <label>
            <br />
            Details:
            <br />
            <input
              type="text"
              name="details"
              value={currentAppointment.details}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
}
