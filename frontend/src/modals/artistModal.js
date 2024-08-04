import React from "react";
import "../style/modal.css";

const ArtistModal = ({ show, handleClose, handleFormChange, handleAddArtist, newArtist }) => {
    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

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
                                <input
                                    name="name"
                                    className="Admin-modalinput"
                                    placeholder='full name'
                                    value={newArtist.name}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Phone</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    name="phone"
                                    className="Admin-modalinput"
                                    placeholder='phone'
                                    value={newArtist.phone}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Email</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    name="email"
                                    className="Admin-modalinput"
                                    placeholder='email'
                                    value={newArtist.email}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Location</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    name="location"
                                    className="Admin-modalinput"
                                    placeholder='location'
                                    value={newArtist.location}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Previous Work</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    type="file"
                                    name="previousWork"
                                    className="Admin-modalinput"
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>E-Certificate</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    type="file"
                                    name="eCertificate"
                                    className="Admin-modalinput"
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Nearest Customer</label>
                            <div>
                                <input
                                    type="checkbox"
                                    name="nearestCustomer"
                                    checked={newArtist.nearestCustomer}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="Admin-modalhead">
                        <button className="Admin-modalsavebtn" onClick={handleAddArtist}>ADD</button>
                        <button className="Admin-modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default artistModal;
