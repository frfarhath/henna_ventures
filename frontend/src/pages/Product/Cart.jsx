import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "4b716b8c",
      name: "Build A Box",
      box: "White-CardBoard Box",
      product1: "Ultra-Dark Henna Cone",
      product2: "Henna Aftercare Balm",
      product3: "Henna Sealant",
      price: 4750,
      quantity: 1,
      selected: false,
    },
    {
      id: "910d8694",
      product: "Ultra-Dark Henna Cone",
      price: 250,
      quantity: 1,
      selected: false,
    },
  ]);

  const handleClick = () => {
    console.log("Go to Product page");
    window.location.href = "http://localhost:3000/product";
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckboxChange = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getSelectedTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    console.log("Checkout clicked");
    window.location.href = "http://localhost:3000/checkoutinfo";
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length > 0) {
      alert("Checking out with selected items");
    } else {
      alert("No items selected for checkout");
    }
  };

  return (
    <div>
      <NewNav />
      <div className="cart">
        <div className="cart-row">
        <h2 className="font-comic text-4xl mb-[20px] mt-5 text-left pl-8">Cart</h2>
          <button
            className="continue-button"
            onClick={handleClick}
            style={{ marginLeft: "auto" }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Continue Shopping
          </button>
        </div>

        <div className="cart-content">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <b>
                      <div>{item.name}</div>
                    </b>
                    <b>
                      <div>{item.product}</div>
                    </b>
                    <div>{item.box}</div>
                    <div>{item.product1}</div>
                    <div>{item.product2}</div>
                    <div>{item.product3}</div>
                  </td>
                  <td>
                    <div className="add-button-container2">
                      <button
                        className="control-button2"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="control-button2"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="control-button2"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                  <td>LKR {item.price * item.quantity}</td>
                  <td>
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totals-container">
            <h4 style={{ textAlign: "right" }}>Subtotal: LKR {getTotal()}</h4>
            <h4 style={{ textAlign: "right" }}>
              Selected Total: LKR {getSelectedTotal()}
            </h4>
          </div>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            style={{ marginLeft: "auto" }}
          >
            Checkout
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
