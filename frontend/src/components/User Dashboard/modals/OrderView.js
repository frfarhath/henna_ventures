import React, { useState, useEffect } from "react";

const OrderView = ({ show, handleClose, passing }) => {
  const showHideClassName = show ? "block" : "hidden";

  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);
  const [giftBox, setGiftBox] = useState({});
  const [card, setCard] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (passing) {
      setId(passing?._id || '');
      setType(passing?.type || '');
      setProducts(Array.isArray(passing?.products) ? passing.products : []); // Ensure products is an array
      setGiftBox(passing?.giftBox || {});
      setCard(passing?.card || '');
      setMessage(passing?.message || '');
    }
  }, [passing]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${showHideClassName}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="bg-gray-200 p-3 font-bold text-center">ORDER DETAILS</div>
        <div className="mt-4">
          <table className="table-auto w-full border-collapse">
            <tbody>
              <tr className="border">
                <th className="text-left px-4 py-2">Order ID</th>
                <td className="px-4 py-2">{id}</td>
              </tr>
              <tr className="border">
                <th className="text-left px-4 py-2">Order Type</th>
                <td className="px-4 py-2">{type}</td>
              </tr>
              {type === "GIFT_BOX" && giftBox?.name && (
                <>
                  <tr className="border">
                    <th className="text-left px-4 py-2">Gift Box Name</th>
                    <td className="px-4 py-2">{giftBox.name}</td>
                  </tr>
                  <tr className="border">
                    <th className="text-left px-4 py-2">Gift Box Price</th>
                    <td className="px-4 py-2">${giftBox.price}</td>
                  </tr>
                </>
              )}
              <tr className="border">
                <th className="text-left px-4 py-2">No. of Items</th>
                <td className="px-4 py-2">{products.length || 0}</td>
              </tr>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index} className="border">
                    <th className="text-left px-4 py-2">Product {index + 1}</th>
                    <td className="px-4 py-2">
                      {product.name} - {product.quantity} pcs @ Rs{product.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">No products</td>
                </tr>
              )}
              {card && (
                <tr className="border">
                  <th className="text-left px-4 py-2">Card</th>
                  <td className="px-4 py-2">{card}</td>
                </tr>
              )}
              {message && (
                <tr className="border">
                  <th className="text-left px-4 py-2">Message</th>
                  <td className="px-4 py-2">{message}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
