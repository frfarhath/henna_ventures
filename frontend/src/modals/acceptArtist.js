import React from 'react';
import "../style/orderModal.css";

const AcceptArtist = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }


    return (
        <div className='modal display-block' style={{ justifyContent: 'center', display: 'flex' }}>
            <div className='modal-main'>
                <button className='close' onClick={handleClose}>&times;</button>

                <h2 className='modalhead'>Generate Credentials</h2>

                <div className='modalbody'>

                    <div>
                        <label>USERNAME</label>
                        <div style={{ width: '90%' }}>
                            <input type="text" className="modalinput" placeholder='username'/>
                        </div>
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <label>PASSWORD</label>
                        <div style={{ width: '90%' }}>
                            <input className="modalinput" placeholder='password'/>
                        </div>
                    </div>

                    <div className="modalhead" style={{ marginTop: 10 }}>
                        <button className="modalsavebtn">Send</button>
                        <button className="modalcancelbtn">Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AcceptArtist;
