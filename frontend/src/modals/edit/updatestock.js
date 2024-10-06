import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../style/modal.css";
import { FaTimes } from "react-icons/fa";

const UpdateStock = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [id, setId] = useState('');
    const [newStock, setNewStock] = useState('');

    useEffect(() => {

        if (passing) {
            setId(passing._id);
            setNewStock(passing.count);
        }

    }, [passing])

    const send = async (e) => {
        e.preventDefault();

        try {

            const postdata = {
                "count": newStock
            };

            const res = await axios.put('http://localhost:8000/api/v1/admin/stockUpdate/' + id, postdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Stock Updated')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Stock Updated')
            window.location.reload();
        }

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
                                    <td>{passing.count}</td>
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
                        <button className="updatestockbtn" onClick={send}>Update Stock</button>
                    </div>

                </div>
            </div>
        </div>
    );

};

export default UpdateStock;
