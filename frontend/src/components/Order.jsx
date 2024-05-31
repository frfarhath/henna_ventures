import React from 'react';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Number of Items</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-6">{order.id}</td>
                <td className="py-3 px-6">{order.items}</td>
                <td className="py-3 px-6">{order.amount}</td>
                <td className={`py-3 px-6 ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>{order.status}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    <i className="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex items-center">
            <button className="py-2 px-4 bg-gray-200 border border-gray-300">Previous</button>
            <span className="py-2 px-4">1</span>
            <button className="py-2 px-4 bg-gray-200 border border-gray-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
