import React, { useState } from "react";
import "../../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Package(props) {
  const [isSelected, setIsSelected] = useState(false); // State to track card selection

  const toggleSelection = () => {
    setIsSelected(!isSelected); // Toggle selection state
  };

  return (
    <div
      className={"product-card" + (isSelected ? " selected" : "")}
      onClick={toggleSelection}
    >
      <img src={props.imgpackage} alt="Product1" className="product-image" />
      <p className="product-name">{props.productname}</p>
      <p className="product-description">{props.productdes}</p>
      {isSelected && (
        <FontAwesomeIcon icon={faCheckCircle} className="green-tick" />
      )}
    </div>
  );
}
