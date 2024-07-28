import React, {useState} from "react";
import "../../style/modal.css";

const EditArtist = ({ show, handleClose }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [fullname, setFullname] = useState('John Doe');
    const [phone, setPhone] = useState('011-7426984');
    const [email, setEmail] = useState('Jhone@gmail.com');
    const [location, setLocation] = useState('Colombo');

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="modal-main">

                    <div className="modalhead">
                        ADD ARTIST
                    </div>

                    <div className="modalbody">

                        <div>
                            <label>Full Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='full name' onChange={(e) => setFullname(e.target.value)} value={fullname} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Phone</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Email</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Location</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='location'  onChange={(e) => setLocation(e.target.value)} value={location}/>
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Previous Work</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" className="modalinput" />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>E-Certificate</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" className="modalinput" />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Nearest Customer</label>
                            <div>
                                <input type="checkbox" />
                            </div>
                        </div>

                    </div>

                    <div className="modalhead">
                        <button className="modalsavebtn" onClick={handleClose}>ADD</button>
                        <button className="modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default EditArtist;