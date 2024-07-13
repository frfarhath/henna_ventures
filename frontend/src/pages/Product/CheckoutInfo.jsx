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
      <div className="message-containerr">
        <div className="main-contentt">
        <h3 className="font-comic text-2xl mb-[-10px] text-center">Reciever's Information</h3>
          <br />
          <div className="column-3">
            <div className="personalInfo">
              <div className="form-floating">
                <label>Receiver Name:</label>
              </div>
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
              <label>Delivery Address:</label>
            </div>
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
            <label>Contact number:</label>
          </div>
          <br />
          <input
            type="number"
            id="tel-number"
            placeholder="Enter receiver's name"
            style={{ width: "50%" }}
          />
          <br />
          <button className="save-button" onClick={handleButtonClick}>
            Proceed for payment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
