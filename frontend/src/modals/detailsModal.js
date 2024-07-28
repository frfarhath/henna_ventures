import React from "react";
import "../style/modal.css";
import "../style/orderModal.css";

const DetailModal = ({ show, handleClose }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="modal-main">

                    <div className="modalhead">
                        APPOINMENT DETAILS
                    </div>

                    <div className="modalbody">

                        <table>
                            <tbody>
                                <tr>
                                    <th>Fist Name</th>
                                    <td>Jhone</td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td>Doe</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>jhone@example.com</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>011-2673983</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>123, Main St</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>Colombo</td>
                                </tr>
                                <tr>
                                    <th>District</th>
                                    <td>Colombo</td>
                                </tr>
                                <tr>
                                    <th>Appointment Date</th>
                                    <td>01/01/2024</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>

                    <div className="modalhead">
                        <button className="modalcancelbtn" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DetailModal;