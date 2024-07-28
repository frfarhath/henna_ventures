import React from "react";
import "../style/modal.css";

const ArtistModal = ({ show, handleClose, handleFormChange, handleAddArtist, newArtist }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

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
                                <input
                                    name="name"
                                    className="modalinput"
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
                                    className="modalinput"
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
                                    className="modalinput"
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
                                    className="modalinput"
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
                                    className="modalinput"
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
                                    className="modalinput"
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

                    <div className="modalhead">
                        <button className="modalsavebtn" onClick={handleAddArtist}>ADD</button>
                        <button className="modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default artistModal;
