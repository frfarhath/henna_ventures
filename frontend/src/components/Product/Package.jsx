import React from "react";
import "../../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setGiftBox } from "../../state/giftBoxSlice";

export default function Package(props) {
  const dispatch = useDispatch();
  const { giftBox } = useSelector((state) => state.giftBox);

  const toggleSelection = () => {
    dispatch(
      setGiftBox({
        name: props.productname,
        price: props.price,
      })
    );
  };

  return (
    <div
      className={
        "product-card" +
        (giftBox?.name === props?.productname ? " selected" : "")
      }
      onClick={toggleSelection}
    >
      <img src={props.imgpackage} alt="Product1" className="product-image" />
      <p className="product-name">{props.productname}</p>
      <p className="product-description">{props.productdes}</p>
      <p className="product-price">Rs. {props.price}</p>
      {giftBox?.name === props?.productname && (
        <FontAwesomeIcon icon={faCheckCircle} className="green-tick" />
      )}
    </div>
  );
}
