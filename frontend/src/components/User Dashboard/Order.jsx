import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import Loading from '../../components/User Dashboard/Loading';
import OrderView from "./modals/OrderView";

const Order = () => {
  const [fetchArray, setFetchArray] = useState([]); // Ensure this is always an array
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [passingArray, setPassingArray] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/individual/getOrder/:id');
        const resdata = res.data || []; // Fallback to empty array if res.data is undefined
        setFetchArray(resdata);
      } catch (error) {
        console.error('Main Error', error);
        setFetchArray([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showModal = (order) => {
    setShow(true);
    setPassingArray(order);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <h1 className="text-2xl font-bold mb-6 text-[#804f0e]">My Orders</h1>

      {!loading ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-[#804f0e]">
            <thead>
              <tr className="w-full bg-[#f5f0eb] border-b">
                <th className="py-3 px-2 sm:px-6 text-center text-[#804f0e] text-xs sm:text-base">Order ID</th>
                <th className="py-3 px-2 sm:px-6 text-center text-[#804f0e] text-xs sm:text-base">Number of Items</th>
                <th className="py-3 px-2 sm:px-6 text-center text-[#804f0e] text-xs sm:text-base">Status</th>
                <th className="py-3 px-2 sm:px-6 text-center text-[#804f0e] text-xs sm:text-base">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(fetchArray) && fetchArray.length > 0 ? (
                fetchArray.map((order) => (
                  <tr key={order._id} className="border-b" style={{ textAlign: 'center' }}>
                    <td className="py-3 px-2 sm:px-6 text-[#804f0e] text-xs sm:text-base">{order._id}</td>
                    <td className="py-3 px-2 sm:px-6 text-[#804f0e] text-xs sm:text-base">{order.products?.length || 0}</td>
                    <td className={`py-3 px-2 sm:px-6 ${order.status === '1' ? 'text-green-600' : 'text-red-600'} text-xs sm:text-base`}>
                      {order.status === '1' ? 'Delivered' : 'Processing'}
                    </td>
                    <td className="py-3 px-2 sm:px-6">
                      <button
                        className="bg-[#804f0e] text-white py-1 sm:py-2 px-2 sm:px-4 rounded hover:bg-[#663b0b] transition-colors duration-300"
                        onClick={() => showModal(order)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}

      <OrderView show={show} handleClose={hideModal} passing={passingArray} />
    </div>
  );
};

export default Order;
