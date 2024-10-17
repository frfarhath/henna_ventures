import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import Loading from '../../components/User Dashboard/Loading';
import OrderView from "./modals/OrderView";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // or however you store your auth token
        console.log('Fetching orders with token:', token); // Log the token (be careful with this in production)
    
        const res = await axios.get('http://localhost:8000/api/v1/user/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        console.log('Response:', res.data); // Log the full response
    
        const ordersData = res.data.orders || [];
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showModal = (order) => {
    setShow(true);
    setSelectedOrder(order);
  };

  const hideModal = () => {
    setShow(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <h1 className="text-2xl font-bold mb-6 text-[#804f0e]">My Orders</h1>

      {loading ? (
        <Loading />
      ) : (
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
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b" style={{ textAlign: 'center' }}>
                    <td className="py-3 px-2 sm:px-6 text-[#804f0e] text-xs sm:text-base">{order._id}</td>
                    <td className="py-3 px-2 sm:px-6 text-[#804f0e] text-xs sm:text-base">{order.products?.length || 0}</td>
                    <td className={`py-3 px-2 sm:px-6 ${order.status === 'PAID' ? 'text-green-600' : 'text-red-600'} text-xs sm:text-base`}>
                      {order.status}
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
      )}

      <OrderView show={show} handleClose={hideModal} passing={selectedOrder} />
    </div>
  );
};

export default Order;