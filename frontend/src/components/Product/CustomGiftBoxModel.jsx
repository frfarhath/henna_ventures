import React, { useEffect, useState } from "react";
import "../../css/product.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateProduct, removeProduct } from "../../state/giftBoxSlice";

const CustomGiftBoxModel = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.giftBox);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addProduct = () => {
    // check message is empty
    if (!message) {
      alert("Please enter a message");
      return;
    }
    dispatch(
      quantity > 0
        ? addOrUpdateProduct({
            name: product.name,
            price: product.price,
            quantity,
            text: message,
          })
        : removeProduct(product.name)
    );
    onClose();
  };

  useEffect(() => {
    // get the product from the products array
    const existingProduct = products.find((p) => p.name === product?.name);
    setQuantity(existingProduct?.quantity || 1);
    setMessage(existingProduct?.text || "");
    if (isUpdated) {
      setIsUpdated(true);
    }
  }, [isUpdated, product?.name, products]);

  if (!product) return null;

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
            <img
              src={product?.img}
              alt={product?.name}
              className="Artist-modal-product-image"
            />
          </div>
        </div>
        <div className="Artist-modal-right">
          <h3 className="font-comic text-2xl mb-[-10px] text-center">
            {product?.name}
          </h3>
          <br />
          <p className="text-model">{product?.productdes}</p>
          <p className="text-model">LKR {product.price}</p>
          <div className="product-options">
            <textarea
              id="custom-content"
              value={message}
              rows={3}
              placeholder="Enter your customized content here"
              className="message-textarea"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="product-quantity">
            <button
              onClick={decrementQuantity}
              className="quantity-button text-white"
            >
              -
            </button>
            <input
              className="!w-28"
              type="number"
              min="1"
              value={quantity}
              readOnly
            />
            <button
              onClick={incrementQuantity}
              className="quantity-button text-white"
            >
              +
            </button>
          </div>
          <button className="add-to-cart-button" onClick={addProduct}>
            {isUpdated ? "Update to Gift Box" : " Add to Gift Box"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomGiftBoxModel;
