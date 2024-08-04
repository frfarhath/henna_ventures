import React from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";

export default function CheckoutInfo() {
  const handleButtonClick = () => {
    console.log("proceed for payment button was clicked");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#d2b48c]">
      <NewNav />
      <div className="flex-grow flex justify-center items-center py-10">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[50%]">
          <h3 className="font-comic text-2xl mb-4 text-center">Receiver's Information</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-lg mb-2">Receiver Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter receiver's name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#804f0e] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Delivery Address:</label>
              <input
                type="text"
                id="address"
                placeholder="Enter receiver's address"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#804f0e] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Contact number:</label>
              <input
                type="text"
                id="tel-number"
                placeholder="Enter receiver's name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#804f0e] focus:border-transparent"
              />
            </div>
            <button
              className="mt-6 w-full bg-[#804f0e] text-white font-bold py-2 rounded-lg hover:bg-[#6b3e0a] transition duration-300"
              onClick={handleButtonClick}
            >
              Proceed for payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
