import React, { useState } from "react";
import "../../css/product.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const ProductModal1 = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const addToCart = async () => {
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
        "http://localhost:8000/api/v1/user/cart",
        {
          product: {
            type: "PRODUCT",
            giftBox: null,
            products: [
              {
                name: product.name,
                price: product.price,
                quantity: quantity,
                text: "",
              },
            ],
            card: null,
            message: null,
          },
        },
        config
      )
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Server Error adding product to cart");
      });
  };

  return (
    <div className="Artist-modal-overlay" onClick={onClose}>
      <div
        className="Artist-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="Artist-modal-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="Artist-modal-left">
          <div className="slider">
            <button className="slider-button prev" onClick={prevImage}>
              &#10094;
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="Artist-modal-product-image"
            />
            <button className="slider-button next" onClick={nextImage}>
              &#10095;
            </button>
          </div>
        </div>
        <div className="Artist-modal-right">
          <h3 className="font-comic text-2xl mb-[-10px] text-center">
            {product.name}
          </h3>
          <br />
          <p className="text-model">{product.productdes}</p>
          <p className="text-model">LKR {product.price}</p>
          <div className="product-quantity">
            <button onClick={decrementQuantity} className="quantity-button">
              -
            </button>
            <input type="number" min="1" value={quantity} readOnly />
            <button onClick={incrementQuantity} className="quantity-button">
              +
            </button>
          </div>
          <button onClick={addToCart} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal1;
