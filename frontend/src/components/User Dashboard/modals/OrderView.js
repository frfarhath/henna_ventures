import React, { useState, useEffect } from "react";

const OrderView = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "block" : "hidden";

    const [id, setId] = useState('');
    const [product, setProduct] = useState('');
    const [count, setCount] = useState('');
    const [custom, setCustom] = useState('');

    useEffect(() => {
        setId(passing.orderid);
        setProduct(passing.product);
        setCount(passing.quantity);
        setCustom(passing.custom);
    }, [passing])

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${showHideClassName}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <div className="bg-gray-200 p-3 font-bold text-center">
                    ORDER DETAILS
                </div>

                <div className="mt-4">
                    <table className="table-auto w-full border-collapse">
                        <tbody>
                            <tr className="border">
                                <th className="text-left px-4 py-2">Order ID</th>
                                <td className="px-4 py-2">{id}</td>
                            </tr>
                            <tr className="border">
                                <th className="text-left px-4 py-2">Product</th>
                                <td className="px-4 py-2">{product}</td>
                            </tr>
                            <tr className="border">
                                <th className="text-left px-4 py-2">No. of Items</th>
                                <td className="px-4 py-2">{count}</td>
                            </tr>
                            <tr className="border">
                                <th className="text-left px-4 py-2">Custom</th>
                                <td className="px-4 py-2">{custom}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    <button 
                        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900" 
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
