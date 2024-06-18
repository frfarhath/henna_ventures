import React from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";

export default function CheckoutInfo() {
  const handleButtonClick = () => {
    console.log("proceed for payment button was clicked");
  };
  return (
    <div>
      <NewNav />
      <br />
      <div className="message-container">
        <div className="main-content">
          <h3>Reciever's Information</h3>
          <br />
          <div className="column-2">
            <div className="personalInfo">
              <div className="form-floating">
                <label>Receiver Name:</label></div>
                <br />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter receiver's name"
                  style={{ width: "50%" }}
                />
              </div>
              <br />
              <div className="form-floating">
                <label>Delivery Address:</label></div>
                <br />
                <input
                  type="text"
                  id="address"
                  placeholder="Enter receiver's address"
                  style={{ width: "50%" }}
                />
              </div>
              <br />
              <div className="form-floating">
                <label>Contact number:</label></div>
                <br />
                <input
                  type="number"
                  id="tel-number"
                  placeholder="Enter receiver's name"
                  style={{ width: "50%" }}
                />
             
              <button className="save-button" onClick={handleButtonClick}>
                Proceed for payment
              </button>
            </div>
            </div>
          
      <Footer />
    </div>
  );
}
