import React, { useEffect, useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutInfo() {
  // get ids from react router navigate state
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState();
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientContact, setRecipientContact] = useState("");

  useEffect(() => {
    // if state null return to cart
    if (!state) {
      navigate("/cart");
    } else {
      setIds(state?.ids);
      const ids = state?.ids;
      // if ids null or empty return to cart
      if (!ids || ids?.length === 0) {
        navigate("/cart");
      }
    }
  }, [ids, navigate, state]);

  const openPayhere = async (res) => {
    const payment_object = {
      sandbox: true,
      preapprove: true,
      merchant_id: res?.merchant_id,
      return_url: res?.return_url,
      cancel_url: res?.cancel_url,
      notify_url: res?.notify_url,
      order_id: res?.order_id,
      items: res?.items,
      amount: res?.amount,
      currency: res?.currency,
      hash: res?.hash,
      first_name: res?.first_name,
      last_name: res?.last_name,
      email: res?.email,
      phone: res?.phone,
      address: res?.address,
      city: res?.city,
      country: res?.country,
    };

    window.payhere.startPayment(payment_object);

    window.payhere.onCompleted = async function onCompleted() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .post("http://localhost:8000/api/v1/user/order/complete", ids, config)
        .then((res) => {
          console.log(res.data);
          alert("Payment completed successfully");
          navigate("/cart");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    window.payhere.onDismissed = function onDismissed() {
      alert("Payment dismissed");
      navigate("/cart");
    };

    window.payhere.onError = function onError() {
      alert("Payment error");
      navigate("/cart");
    };
  };

  const startOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(
        "http://localhost:8000/api/v1/user/order",
        {
          items: ids,
          recipientName,
          recipientAddress,
          recipientContact,
        },
        config
      )
      .then((res) => {
        openPayhere(res?.data?.payment);
      })
      .catch((error) => {
        console.error("Error adding product to order:", error);
        alert("Server Error adding product to order");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#d2b48c]">
      <NewNav />
      <div className="flex-grow flex justify-center items-center py-10">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[50%]">
          <h3 className="font-comic text-2xl mb-4 text-center">
            Receiver's Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-lg mb-2">Receiver Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter receiver's name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#804f0e] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Delivery Address:</label>
              <input
                type="text"
                id="address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter receiver's address"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#804f0e] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Contact number:</label>
              <input
                type="text"
                id="tel-number"
                value={recipientContact}
                onChange={(e) => setRecipientContact(e.target.value)}
                placeholder="Enter receiver's name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#804f0e] focus:border-transparent"
              />
            </div>
            <button
              className="mt-6 w-full bg-[#804f0e] text-white font-bold py-2 rounded-lg hover:bg-[#6b3e0a] transition duration-300"
              onClick={startOrder}
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
