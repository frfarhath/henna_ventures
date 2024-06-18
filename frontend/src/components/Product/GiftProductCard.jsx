import React, { useState } from "react";
import "../../css/product.css";

export default function GiftProductCard(props) {
  const { imgmehendi, productname, price: initialPrice } = props;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddClick = () => {
    setAdded(true);
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handlePlusClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const currentPrice = (quantity * initialPrice).toFixed(2);

  return (
    <div className="product-card">
      <img src={imgmehendi} alt="Product1" className="product-image" />
      <p className="product-name">{productname}</p>
      <div className="add-button-container">
        {added ? (
          <>
            <button className="control-button" onClick={handleMinusClick}>
              -
            </button>
            <button className="main-button">Add: LKR {currentPrice}</button>
            <button className="control-button" onClick={handlePlusClick}>
              +
            </button>
          </>
        ) : (
          <button className="main-button" onClick={handleAddClick}>
            Add: LKR {currentPrice}
          </button>
        )}
      </div>
    </div>
  );
}
