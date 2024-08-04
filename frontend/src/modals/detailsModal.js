import React, { useState, useEffect } from "react";
import "../style/modal.css";
import "../style/orderModal.css";

const DetailModal = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {

        if (passing.address) {
            setFirstname(passing.firstname);
            setLastname(passing.lastname);
            setEmail(passing.email);
            setPhone(passing.phone);
            setAddress(passing.address);
            setCity(passing.city);
            setDistrict(passing.district);
            setDate(passing.wedding);
        } else{
            setFirstname(passing.firstname);
            setLastname(passing.lastname);
            setEmail(passing.email);
            setPhone(passing.phone);
            setAddress(passing.address1);
            setCity(passing.city);
            setDistrict(passing.district);
            setDate(passing.wedding);
        }

    }, [passing])

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="Admin-modal-main">

                    <div className="Admin-modalhead">
                        APPOINMENT DETAILS
                    </div>

                    <div className="Admin-modalbody">

                        <table>
                            <tbody>
                                <tr>
                                    <th>Fist Name</th>
                                    <td>{firstname}</td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td>{lastname}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{phone}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{address}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{city}</td>
                                </tr>
                                <tr>
                                    <th>District</th>
                                    <td>{district}</td>
                                </tr>
                                <tr>
                                    <th>Appointment Date</th>
                                    <td>{date}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="Admin-modalhead">
                        <button className="Admin-modalcancelbtn" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DetailModal;