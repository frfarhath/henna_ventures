import React from 'react'
import '../css/product.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard(props) {

  return (
    <div className="product-card">
      <img src={props.imgmehendi} alt="Product1" className="product-image" />
      <p className="product-name">{props.productname}</p>
      <p className="product-description">{props.productdes}</p>
      <div className="product-price">${props.price}</div>
      <button className="product-button">
      <FontAwesomeIcon icon={faEye} /> View Product
    </button>
      <button className="product-button">
      <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
    </button>
    </div>
  )
}
