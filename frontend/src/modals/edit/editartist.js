import React, {useState} from "react";
import "../../style/modal.css";

const EditArtist = ({ show, handleClose }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [fullname, setFullname] = useState('John Doe');
    const [phone, setPhone] = useState('011-7426984');
    const [email, setEmail] = useState('Jhone@gmail.com');
    const [location, setLocation] = useState('Colombo');

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="Admin-modal-main">

                    <div className="Admin-modalhead">
                        ADD ARTIST
                    </div>

                    <div className="Admin-modalbody">

                        <div>
                            <label>Full Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='full name' onChange={(e) => setFullname(e.target.value)} value={fullname} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Phone</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Email</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Location</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='location'  onChange={(e) => setLocation(e.target.value)} value={location}/>
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Previous Work</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" className="Admin-modalinput" />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>E-Certificate</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" className="Admin-modalinput" />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Nearest Customer</label>
                            <div>
                                <input type="checkbox" />
                            </div>
                        </div>

                    </div>

                    <div className="Admin-modalhead">
                        <button className="Admin-modalsavebtn" onClick={handleClose}>ADD</button>
                        <button className="Admin-modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default EditArtist;