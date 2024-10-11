import React, { useState } from "react";
import "../../css/product.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

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
                text: message,
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
        className="Artist-modal-content flex flex-col gap-y-3 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="Artist-modal-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h3 className="font-comic text-2xl mb-0 text-center">{product.name}</h3>
        <div className="flex gap-x-3 w-full">
          <div className="relative w-1/2">
            <button
              className="slider-button !m-1 !h-8 start-0 flex items-center justify-center !w-10"
              onClick={prevImage}
            >
              &#10094;
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="rounded-md max-h-60 object-cover w-full bg-gray-300 flex justify-center items-center h-full"
            />
            <button
              className="absolute !m-1 slider-button end-0 !h-8 flex items-center justify-center !w-10"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </div>
          <div className="w-1/2">
            <p className="font-medium mb-1">
              Price : LKR {product.price} / 1 Pcs
            </p>
            <div className="">
              <textarea
                id="custom-content"
                value={message}
                rows={5}
                placeholder="Enter your customized content here"
                className="border-gray-400 rounded-md w-full"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="product-quantity w-full mt-3">
              <button
                onClick={decrementQuantity}
                className="!h-10 !w-10 p-0 text-white"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                readOnly
                className="!w-32"
              />
              <button
                onClick={incrementQuantity}
                className="!h-10 !w-10 p-0 text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <p className="text-model">{product.productdes}</p>
        <button onClick={addToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductModal2;
