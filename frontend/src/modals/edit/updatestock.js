import React, { useState } from "react";
import "../../style/modal.css";
import { FaTimes } from "react-icons/fa";

const UpdateStock = ({ show, handleClose, passing, handleStockUpdate }) => {
    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";
    const [newStock, setNewStock] = useState('');

    const handleUpdateStock = () => {
        handleStockUpdate(passing.number, newStock);
        handleClose();
    };

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>
                <div className="Admin-modal-main">
                    <div className="Admin-modalhead">
                        <span>UPDATE STOCK</span>
                        <FaTimes size={22} className="close-icon" onClick={handleClose} />
                    </div>
                    <div className="Admin-modalbody">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{passing.name}</td>
                                </tr>
                                <tr>
                                    <th>Available Count</th>
                                    <td>{passing.available}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{passing.description}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <label style={{ fontWeight: 'bold' }}>Stock</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    className="Admin-modalinput"
                                    placeholder='count'
                                    value={newStock}
                                    onChange={(e) => setNewStock(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Admin-modalhead">
                        <button className="updatestockbtn" onClick={handleUpdateStock}>Update Stock</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStock;
