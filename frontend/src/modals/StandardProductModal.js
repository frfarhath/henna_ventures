import React from 'react';
import "../style/orderModal.css";
import { FaTimes } from "react-icons/fa";

const StandardProductModal = ({ show, handleClose, productDetails }) => {
    if (!show) return null;

    return (
        <div className="Admin-modal">
            <div className="Admin-modal-main">
                <div className="Admin-modalhead">
                    <h2>Standard Product Details</h2>
                    <button className="close" onClick={handleClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="Admin-modalbody">
                    <p><strong>Product Name:</strong> {productDetails.name}</p>
                    <p><strong>Count:</strong> {productDetails.count}</p>
                    <p><strong>Customized Content:</strong> {productDetails.customizedContent}</p>
                </div>
                <div className="Admin-modalfooter">
                    <button className="Admin-modalsavebtn" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default StandardProductModal;
