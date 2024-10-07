import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import Loading from '../../components/User Dashboard/Loading';
import OrderView from "./modals/OrderView";
const Order = () => {

  const [fetchArray, setFetchArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [passingArray, setPassingArray] = useState({});


  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/individual/getOrder');
        const resdata = await res.data;
        setFetchArray(resdata);
        setLoading(false)

      } catch (error) {
        console.log('Main Error', error);
      }

    };

    fetchData();

  }, []);

  const showModal = (order) => {
    setShow(true);
    setPassingArray(order);
  }

  const hideModal = () => {
    setShow(false)
  }


  return (
    <div className="container mx-auto px-4 py-8 font-serif">

      <h1 className="text-2xl font-bold mb-6 text-[#804f0e]">My Orders</h1>

      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-[#804f0e]">
            <thead>
              <tr className="w-full bg-[#f5f0eb] border-b">
                <th className="py-3 px-2 sm:px-6 text-left text-[#804f0e] text-xs sm:text-base" style={{ textAlign: 'center' }}>Order ID</th>
                <th className="py-3 px-2 sm:px-6 text-left text-[#804f0e] text-xs sm:text-base" style={{ textAlign: 'center' }}>Number of Items</th>
                <th className="py-3 px-2 sm:px-6 text-left text-[#804f0e] text-xs sm:text-base" style={{ textAlign: 'center' }}>Status</th>
                <th className="py-3 px-2 sm:px-6 text-left text-[#804f0e] text-xs sm:text-base" style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {fetchArray.map(order => (
                <tr key={order.id} className="border-b" style={{ textAlign: 'center' }}>
                  <td className="py-3 px-2 sm:px-6 text-[#804f0e] text-xs sm:text-base">{order.orderid}</td>
                  <td className="py-3 px-2 sm:px-6 text-[#804f0e] text-xs sm:text-base">{order.quantity}</td>
                  
                  <td className={`py-3 px-2 sm:px-6 ${order.status === '1' ? 'text-green-600' : 'text-red-600'} text-xs sm:text-base`}>
                    {order.status === '1' && (
                      <div>
                        Delivered
                      </div>
                    )}
                    {order.status === '0' && (
                      <div>
                        Processing
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-2 sm:px-6">
                    <button className="bg-[#804f0e] text-white py-1 sm:py-2 px-2 sm:px-4 rounded hover:bg-[#663b0b] transition-colors duration-300"
                      onClick={() => showModal(order)}>
                      <FaEye />
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          <div className="mt-4 flex justify-between items-center flex-col sm:flex-row">
            <span className="text-[#804f0e] text-xs sm:text-base">Showing 1 to 3 of 3 entries</span>
            <div className="flex items-center mt-2 sm:mt-0">
              <button className="py-2 px-4 bg-[#f5f0eb] border border-[#804f0e] text-[#804f0e] hover:bg-[#e3d6c3] transition-colors duration-300 text-xs sm:text-base">Previous</button>
              <span className="py-2 px-4 text-[#804f0e] text-xs sm:text-base">1</span>
              <button className="py-2 px-4 bg-[#f5f0eb] border border-[#804f0e] text-[#804f0e] hover:bg-[#e3d6c3] transition-colors duration-300 text-xs sm:text-base">Next</button>
            </div>
          </div>
        </div>

      )}

      {loading && (
        <Loading />
      )}

      <OrderView show={show} handleClose={hideModal} passing={passingArray} />

    </div>
  );

};

export default Order;
