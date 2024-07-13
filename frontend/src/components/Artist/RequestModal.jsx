import React from "react";
import "../../css/product.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RequestModal = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contentt" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <table className="modal-table">
        <h3 className="font-comic text-2xl mb-[-10px] text-center">Detailed Information</h3>
          <br />
          <tbody>
            <tr>
              <td>
                <b>Client Name</b>
              </td>
              <td>{request.firstname + " " + request.lastname}</td>
            </tr>
            <tr>
              <td>
                <b>Date:</b>
              </td>
              <td>{request.date}</td>
            </tr>
            <tr>
              <td>
                <b>Appointment Time:</b>
              </td>
              <td>{request.time}</td>
            </tr>
            <tr>
              <td>
                <b>Email:</b>
              </td>
              <td>{request.email}</td>
            </tr>
            <tr>
              <td>
                <b>City:</b>
              </td>
              <td>{request.city}</td>
            </tr>
            <tr>
              <td>
                <b>Address:</b>
              </td>
              <td>{request.address}</td>
            </tr>
            <tr>
              <td>
                <b>District:</b>
              </td>
              <td>{request.district}</td>
            </tr>
            <tr>
              <td>
                <b>Type:</b>
              </td>
              <td>{request.type}</td>
            </tr>
            <tr>
              <td>
                <b>Type of Mehendi:</b>
              </td>
              <td>{request.typeofMehendi}</td>
            </tr>
            <tr>
              <td>
                <b>Henna Design Coverage:</b>
              </td>
              <td>{request.designCoverage}</td>
            </tr>
            <tr>
              <td>
                <b>Mehendi On:</b>
              </td>
              <td>{request.mehendiOn}</td>
            </tr>
            <tr>
              <td>
                <b>Mehendi For:</b>
              </td>
              <td>{request.mehendifor}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestModal;
