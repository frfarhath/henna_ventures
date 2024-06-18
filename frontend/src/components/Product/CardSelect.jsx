import React, { useState } from "react";
import "../../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Import green tick icon from Font Awesome
export default function GiftProductCard(props) {
  const [isSelected, setIsSelected] = useState(false); // State to track card selection

  const toggleSelection = () => {
    setIsSelected(!isSelected); // Toggle selection state
  };

  return (
    <div
      className={"product-card" + (isSelected ? " selected" : "")}
      onClick={toggleSelection}
    >
      <img src={props.imgwish} alt="Wish1" className="product-image" />
      {isSelected && (
        <FontAwesomeIcon icon={faCheckCircle} className="green-tick" />
      )}
    </div>
  );
}
