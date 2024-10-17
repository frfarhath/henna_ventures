import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import Loading from '../../components/Admin/loading';
import OrderView from '../../modals/orderView';
import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import "../../style/dashboard.css";
import "../../style/product.css";

const Order = () => {
  const [fetchArray, setFetchArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [passingArray, setPassingArray] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/individual/getOrder');
      console.log('Fetched Orders:', res.data);
      const resdata = res.data || [];
      setFetchArray(resdata);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (order) => {
    console.log('Showing modal for order:', order);
    setShow(true);
    setPassingArray(order);
  };

  const hideModal = () => {
    setShow(false);
  };
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const postdata = { status: newStatus };
      await axios.put(`http://localhost:8000/api/v1/individual/updateOrder/${orderId}`, postdata);
      alert('Successfully updated order status!');
      // Update the local state to reflect the change
      setFetchArray(prevArray =>
        prevArray.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    }
  };


  const statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'PAID', label: 'Paid' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return { backgroundColor: 'rgb(168, 150, 19)', color: 'white', padding: '0.2rem', borderRadius: '0.5rem' };
      case 'PAID':
        return { backgroundColor: 'blue', color: 'white', padding: '0.2rem', borderRadius: '0.5rem' }; 
      case 'DELIVERED':
        return { backgroundColor: 'green', color: 'white', padding: '0.2rem', borderRadius: '0.5rem' };
      case 'CANCELLED':
        return { backgroundColor: 'red', color: 'white', padding: '0.2rem', borderRadius: '0.5rem' };
      default:
        return {};
    }
  };

  return (
    <div className='body'>
      <SideBar />
      <div className='content'>
        <Head />
        <div className='conbody'>
          <div className='producthead'>
            <h3 className='productheadtxt'>ORDERS</h3>
          </div>
          <div className='producttable'>
            {!loading ? (
              <table>
                <thead>
                  <tr>
                    {/* <th>Order ID</th> */}
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    {/* <th>Type</th> */}
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchArray.length > 0 ? (
                    fetchArray.map((order) => (
                      <tr key={order._id}>
                        {/* <td>{order._id}</td> */}
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.recipientName}</td>
                        <td>{order.recipientAddress}</td>
                        <td>{order.recipientContact}</td>
                        {/* <td>{order.type}</td> */}
                        <td>{order.products ? order.products.length : (order.giftBox ? 1 : 0)}</td>
                        <td>
                          ${order.type === 'PRODUCT'
                            ? order.products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
                            : order.giftBox.price.toFixed(2)}
                        </td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="Admin-modalinput"
                            style={getStatusStyle(order.status)}
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <FaEye onClick={() => showModal(order)} style={{ cursor: 'pointer' }} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center' }}>No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      <OrderView show={show} handleClose={hideModal} passing={passingArray} />
    </div>
  );
};

export default Order;
