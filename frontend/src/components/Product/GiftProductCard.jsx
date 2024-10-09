import React from "react";
import "../../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateProduct, removeProduct } from "../../state/giftBoxSlice";

export default function GiftProductCard(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.giftBox);
  const { imgmehendi, productname, price: initialPrice, productdes } = props;

  const added = products.some((product) => product.name === productname);
  const product = products.find((product) => product.name === productname);
  const currentPrice = product?.price * product?.quantity || initialPrice;

  return (
    <div className="product-card">
      <img src={imgmehendi} alt="Product1" className="product-image" />
      <p className="product-name">{productname}</p>
      {(productdes === "Henna Products" || productdes === "Reselling") && (
        <div className="add-button-container">
          {added ? (
            <>
              <button
                className="control-button"
                onClick={() => {
                  dispatch(
                    product?.quantity > 1
                      ? addOrUpdateProduct({
                          name: productname,
                          price: initialPrice,
                          quantity: product?.quantity - 1,
                          text: "",
                        })
                      : removeProduct(productname)
                  );
                }}
              >
                -
              </button>
              <button className="main-button">Add: LKR {currentPrice}</button>
              <button
                className="control-button"
                onClick={() => {
                  dispatch(
                    addOrUpdateProduct({
                      name: productname,
                      price: initialPrice,
                      quantity: product?.quantity + 1,
                      text: "",
                    })
                  );
                }}
              >
                +
              </button>
            </>
          ) : (
            <button
              className="main-button"
              onClick={() =>
                dispatch(
                  addOrUpdateProduct({
                    name: productname,
                    price: initialPrice,
                    quantity: product?.quantity || 1,
                    text: "",
                  })
                )
              }
            >
              Add: LKR {currentPrice}
            </button>
          )}
        </div>
      )}
      {!(productdes === "Henna Products" || productdes === "Reselling") && (
        <>
          <p className="product-description">LKR {initialPrice}</p>
          <button className="add-to-cart-button" onClick={props.onViewProduct}>
            <FontAwesomeIcon icon={faEye} /> View Product
          </button>
        </>
      )}
    </div>
  );
}
