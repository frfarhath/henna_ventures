import React, { useState, useEffect, useCallback } from "react";
import "../../css/artist.css";
import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getRequestAppointments = useCallback(async (date) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get(`http://localhost:8000/api/v1/artist/appointments/${date}`, config)
      .then(({ data }) => {
        setAppointments(data.appointments);
      })
      .catch(() => {
        alert("Error fetching appointments");
      });
  }, []);

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    getRequestAppointments(formattedDate);
  }, [getRequestAppointments, selectedDate]);

  return (
    <div className="right-container">
      <div className="main-content">
        <h3 className="font-comic text-2xl mb-[-10px] text-center">
          Confirmed Appointments for {selectedDate.toISOString().split("T")[0]}
        </h3>
        {/* date picker */}
        <div className="date-picker pt-6">
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            className="rounded-md min-w-52"
          />
        </div>
        <table className="timetable">
          <thead>
            <tr>
              <th>Time</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Number</th>
              <th>District</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.time}</td>
                <td>{appointment.firstname}</td>
                <td>{appointment.lastname}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.district}</td>
                <td>
                  {appointment.appointment_type === "individual" && (
                    <span className="">
                      {appointment.address1},{appointment.address2},
                      {appointment.city}
                    </span>
                  )}
                  {appointment.appointment_type === "package" && (
                    <span className="">{appointment.address}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
