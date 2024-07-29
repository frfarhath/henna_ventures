import React, { useState, useEffect } from "react";
import "../style/modal.css";
import "../style/orderModal.css";

const DashStockModal2 = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="modal-main">

                    <div className="modalhead">
                        STOCK PRODUCTS DETAILS
                    </div>

                    <div className="modalbody">

                        <table>
                            <thead>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }}>PRODUCT</td>
                                    <td style={{ fontWeight: 'bold' }}>AVAILABLE</td>
                                </tr>
                            </thead>
                            <tbody>
                                {passing.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.count}</td>
                                    </tr>
                                ))}
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

export default DashStockModal2;