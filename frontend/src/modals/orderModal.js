import React from 'react';
import "../style/orderModal.css";

const OrderModal = ({ show, handleClose, passing }) => {

    if (!show) {
        return null;
    }


    return (
        <div className='Admin-modal display-block' style={{ justifyContent: 'center', display: 'flex'}}>
            <div className='Admin-modal-main'>
                <button className='close' onClick={handleClose}>&times;</button>
                <h2 className='Admin-modalhead'>Order Details</h2>
                <div className='Admin-modalbody'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Customized Content</th>
                                <th>Quantity</th>
                                <th>Content Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{passing.product}</td>
                                <td>{passing.custom}</td>
                                <td>{passing.quantity}</td>
                                <td>{passing.message}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
