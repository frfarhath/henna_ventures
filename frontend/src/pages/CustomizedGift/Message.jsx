import React from "react";
import "../../css/product.css";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../state/giftBoxSlice";

export default function Message() {
  const { message } = useSelector((state) => state.giftBox);
  const dispatch = useDispatch();
  return (
    <div className="message-container">
      <label htmlFor="message">Greeting Card Message</label>
      <div className="greeting-card-container">
        <textarea
          id="message"
          value={message}
          onChange={(e) => dispatch(addMessage(e.target.value))}
          placeholder="Leave blank if you wish to write it yourself"
          className="message-textarea"
        />
      </div>
    </div>
  );
}
