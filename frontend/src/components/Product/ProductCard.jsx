import React from "react";
import "../../css/product.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({
  imgmehendi,
  productname,
  productdes,
  price,
  onViewProduct,
}) {
  return (
    <div className="product-card">
      <img src={imgmehendi} alt={productname} className="product-image" />
      <p className="product-name">{productname}</p>
      <p className="product-description">{productdes}</p>
      <div className="product-price">LKR {price}</div>
      <button className="add-to-cart-button" onClick={onViewProduct}>
        <FontAwesomeIcon icon={faEye} /> View Product
      </button>
    </div>
  );
}
