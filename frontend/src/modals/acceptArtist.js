import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../style/orderModal.css";

const AcceptArtist = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [receivedArray, setReceivedArray] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        if (passing) {
            setReceivedArray(passing);
        }

    }, [passing])

    const send = async (e) => {
        e.preventDefault();

        try {

            const postdata = {
                "id": receivedArray._id,
                "fullname": receivedArray.full_name,
                "phone": receivedArray.phone,
                "email": receivedArray.email,
                "location": receivedArray.location,
                "prework": receivedArray.previous_work,
                "certificate": receivedArray.e_certificate,
                "is_approved": 'true',
                "username": username,
                "password": password,
                "pass": password,
            };

            const res = await axios.post('http://localhost:8000/api/v1/admin/sendMail', postdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Artist Approved')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Artist Approved')
            window.location.reload();
        }

    }


    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <div className='Admin-modal-main'>
                    <button className='close' onClick={handleClose}>&times;</button>

                    <h2 className='Admin-modalhead'>Generate Credentials</h2>

                    <div className='Admin-modalbody'>

                        <div>
                            <label>USERNAME</label>
                            <div style={{ width: '90%' }}>
                                <input type="text" className="Admin-modalinput" placeholder='username'
                                    onChange={(e) => setUsername(e.target.value)} value={username} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>PASSWORD</label>
                            <div style={{ width: '90%' }}>
                                <input type="password" className="Admin-modalinput" placeholder='password'
                                    onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                        </div>

                        <div className="Admin-modalhead" style={{ marginTop: 10 }}>
                            <button className="Admin-modalsavebtn" onClick={send}>Send</button>
                            <button className="Admin-modalcancelbtn" onClick={handleClose}>Cancel</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );

};

export default AcceptArtist;
