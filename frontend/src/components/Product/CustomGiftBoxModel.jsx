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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
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
        <p className="text-model py-2">{product.productdes}</p>
        <button className="add-to-cart-button" onClick={addProduct}>
          {isUpdated ? "Update to Gift Box" : " Add to Gift Box"}
        </button>
      </div>
    </div>
  );
};

export default CustomGiftBoxModel;
