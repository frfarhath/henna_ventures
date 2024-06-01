import React from 'react';
import { FaEye } from 'react-icons/fa'; // Importing the eye icon from react-icons

const orders = [
  {
    id: '63e4e0a1c4298319c53ba109',
    items: 1,
    amount: '$469.07',
    status: 'Processing'
  },
  {
    id: '63e4e58053fd1522749d83fc',
    items: 2,
    amount: '$720.55',
    status: 'Processing'
  },
  {
    id: '63e4e5efc9d03f4e3902b0c',
    items: 1,
    amount: '$257.95',
    status: 'Delivered'
  }
];

const Order = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <h1 className="text-2xl font-bold mb-6 text-[#804f0e]">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-[#804f0e]">
          <thead>
            <tr className="w-full bg-[#f5f0eb] border-b">
              <th className="py-3 px-6 text-left text-[#804f0e]">Order ID</th>
              <th className="py-3 px-6 text-left text-[#804f0e]">Number of Items</th>
              <th className="py-3 px-6 text-left text-[#804f0e]">Amount</th>
              <th className="py-3 px-6 text-left text-[#804f0e]">Status</th>
              <th className="py-3 px-6 text-left text-[#804f0e]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-6 text-[#804f0e]">{order.id}</td>
                <td className="py-3 px-6 text-[#804f0e]">{order.items}</td>
                <td className="py-3 px-6 text-[#804f0e]">{order.amount}</td>
                <td className={`py-3 px-6 ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>{order.status}</td>
                <td className="py-3 px-6">
                  <button className="bg-[#804f0e] text-white py-2 px-4 rounded hover:bg-[#663b0b] transition-colors duration-300">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-[#804f0e]">Showing 1 to 3 of 3 entries</span>
          <div className="flex items-center">
            <button className="py-2 px-4 bg-[#f5f0eb] border border-[#804f0e] text-[#804f0e] hover:bg-[#e3d6c3] transition-colors duration-300">Previous</button>
            <span className="py-2 px-4 text-[#804f0e]">1</span>
            <button className="py-2 px-4 bg-[#f5f0eb] border border-[#804f0e] text-[#804f0e] hover:bg-[#e3d6c3] transition-colors duration-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
