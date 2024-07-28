import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/product.css";
import ProgressBar from "../../components/Product/ProgressBar";
import GoBackFooter from "../../components/Product/GoBackFooter";

export default function Message() {
  const [total, setTotal] = useState(3250);

  const handleNext = () => {
    console.log("Next button clicked");
    window.location.href = "http://localhost:3000/cart";
  };

  const handleBack = () => {
    console.log("Go Back button clicked");
    window.location.href = "http://localhost:3000/selectcard";
  };

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-[20px] mt-5 text-left pl-8">Message on Card</h2>
      <ProgressBar value={1.0} />

      <div className="message-container">
        <label htmlFor="message">Greeting Card Message</label>
        <div className="greeting-card-container">
          <textarea
            id="message"
            value={message}
            onChange={handleChange}
            placeholder="Leave blank if you wish to write it yourself"
            className="message-textarea"
          />
        </div>
        <GoBackFooter total={total} onNext={handleNext} onBack={handleBack} />
      </div>
      <Footer />
    </div>
  );
}
