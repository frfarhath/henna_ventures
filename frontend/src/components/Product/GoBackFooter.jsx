import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoBackFooter = ({ total, onNext, onBack, current }) => {
  const { giftBox, products, card, message } = useSelector(
    (state) => state.giftBox
  );
  const navigate = useNavigate();

  const addToCart = useCallback(async () => {
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
            type: "GIFT_BOX",
            giftBox,
            products,
            card,
            message,
          },
        },
        config
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Server Error adding product to cart");
      });
  }, [card, giftBox, message, navigate, products]);

  useEffect(() => {
    if (current === 5) {
      addToCart();
    }
  }, [addToCart, current]);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="total-amount">Total: {total} LKR</div>
        <div className="button-group1">
          {current !== 1 && (
            <button onClick={onBack} className="footer-button">
              Go Back
            </button>
          )}
          <button onClick={onNext} className="footer-button">
            Next
          </button>
        </div>
      </div>
    </footer>
  );
};

export default GoBackFooter;
