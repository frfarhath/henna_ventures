import React from "react";
import "../../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Import green tick icon from Font Awesome
import { useDispatch, useSelector } from "react-redux";
import { addCard, removeCard } from "../../state/giftBoxSlice";

export default function GiftProductCard(props) {
  const { card } = useSelector((state) => state.giftBox);
  const dispatch = useDispatch();

  const isSelected = card === props?.type;

  const toggleSelection = () => {
    props.type !== 12 ? dispatch(addCard(props.type)) : dispatch(removeCard());
  };

  return (
    <div
      className={"product-card" + (isSelected ? " selected" : "")}
      onClick={toggleSelection}
    >
      <img src={props.imgwish} alt="Wish1" className="product-image" />
      {isSelected && (
        <FontAwesomeIcon icon={faCheckCircle} className="green-tick" />
      )}
    </div>
  );
}
