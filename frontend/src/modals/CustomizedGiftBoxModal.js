import React from 'react';
import "../style/orderModal.css";
import { FaTimes } from "react-icons/fa";

const CustomizedGiftBoxModal = ({ show, handleClose, productDetails }) => {
    // If show is false or productDetails is undefined, do not render the modal
    if (!show || !productDetails) return null;

    console.log('Product Details:', productDetails); // Debugging line

    return (
        <div className="Admin-modal">
            <div className="Admin-modal-main">
                <div className="Admin-modalhead">
                    <h2>Customized Gift Box Details</h2>
                    <button className="close" onClick={handleClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="Admin-modalbody">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Count</th>
                                <th>Customized Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.contents && productDetails.contents.length > 0 ? (
                                productDetails.contents.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName || 'N/A'}</td>
                                        <td>{item.count || 'N/A'}</td>
                                        <td>{item.customContent || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                // If no contents, show a single row indicating empty contents
                                <tr>
                                    <td colSpan="3">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="Admin-modalfooter">
                    <h4>Selected Box: {productDetails.selectedBox || 'N/A'}</h4>
                    <h4>Selected Card: {productDetails.selectedCard || 'N/A'}</h4>
                    <h4>Greeting Card Message: {productDetails.greetingCardMessage || 'N/A'}</h4>
                    <div className="button-container">
                        <button className="Admin-modalsavebtn" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizedGiftBoxModal;
