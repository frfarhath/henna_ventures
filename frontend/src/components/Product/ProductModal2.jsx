import React, { useState } from "react";
import "../../css/product.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductModal2 = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState("");

  if (!product) return null;

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-left">
          <div className="slider">
            <button className="slider-button prev" onClick={prevImage}>
              &#10094;
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="modal-product-image"
            />
            <button className="slider-button next" onClick={nextImage}>
              &#10095;
            </button>
          </div>
        </div>
        <div className="modal-right">
          <h3>{product.name}</h3>
          <br />
          <p className="text-model">{product.productdes}</p>
          <p className="text-model">LKR {product.price}</p>
          <div className="product-options">
            <textarea
              id="custom-content"
              value={message}
              placeholder="Enter your customised content here"
              className="message-textarea"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="product-quantity">
            <button onClick={decrementQuantity} className="quantity-button">
              -
            </button>
            <input type="number" min="1" value={quantity} readOnly />
            <button onClick={incrementQuantity} className="quantity-button">
              +
            </button>
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal2;
