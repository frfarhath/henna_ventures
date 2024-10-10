import React, { useCallback, useEffect, useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearAll } from "../../state/giftBoxSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);
  const navigate = useNavigate();

  const getTotal = (item) => {
    if (!item) {
      return 0;
    }
    const { giftBox, products } = item;
    const total =
      (giftBox?.price || 0) +
        products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        ) || 0;

    return total;
  };

  const calculateOverallTotal = useCallback((items) => {
    const total = items.reduce((acc, item) => acc + getTotal(item), 0);
    setOverallTotal(total);
  }, []);

  const handleCheckChange = (id, total) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      setSubtotal(subtotal - total);
    } else {
      setSelectedIds([...selectedIds, id]);
      setSubtotal(subtotal + total);
    }
  };

  const handleQuantityChange = async (id, itemId, delta) => {
    // get updated cart item with new quantity
    const updatedCartItem = cartItems.map((item) => {
      if (item._id === id) {
        item.products = item.products.map((product) => {
          if (product._id === itemId) {
            product.quantity += delta;
          }
          return product;
        });
      }
      return item;
    });

    // get only updated cart
    const updatedCart = updatedCartItem.find((item) => item._id === id);

    // clear current states
    dispatch(clearAll());
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
      .put(
        `http://localhost:8000/api/v1/user/cart/${id}`,
        {
          product: updatedCart,
        },
        config
      )
      .then(({ data }) => {
        setCartItems(data?.cart);
        calculateOverallTotal(data?.cart);
        alert("Product quantity updated in cart successfully");
      })
      .catch((error) => {
        console.error("Error updating product in cart:", error);
        alert("Server Error updating product in cart");
      });
  };

  const handleRemoveItem = async (id) => {
    // clear current states
    dispatch(clearAll());
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // ask user to confirm before removing item
    if (!window.confirm("Are you sure you want to remove this item?")) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/v1/user/cart/${id}`, config)
      .then(({ data }) => {
        setCartItems(data?.cart);
        calculateOverallTotal(data?.cart);
        alert("Product removed from cart successfully");
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
        alert("Server Error removing product from cart");
      });
  };

  const handleGetCart = useCallback(async () => {
    // clear current states
    dispatch(clearAll());
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
      .get("http://localhost:8000/api/v1/user/cart", config)
      .then(({ data }) => {
        setCartItems(data?.cart);
        calculateOverallTotal(data?.cart);
      })
      .catch((error) => {
        console.error("Error getting product to cart:", error);
        alert("Server Error getting product to cart");
      });
  }, [calculateOverallTotal, dispatch]);

  useEffect(() => {
    handleGetCart();
  }, [handleGetCart]);

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
          <h2 className="font-comic text-4xl mb-[20px] mt-5 text-left pl-8">
            Cart
          </h2>
          <button
            className="continue-button"
            onClick={() => navigate("/product")}
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
                <th class="bg-[#804f0e] text-white">Product</th>
                <th class="bg-[#804f0e] text-white">Quantity</th>
                <th class="bg-[#804f0e] text-white">Total</th>
                <th class="bg-[#804f0e] text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item?._id}>
                  <td>
                    {item?.type === "GIFT_BOX" && (
                      <p className="mb-2 font-semibold">
                        {item?.giftBox?.name}
                      </p>
                    )}
                    {item?.products.map((product) => (
                      <div key={product?.name}>
                        <span className="font-medium">{product?.name}</span>
                        <span> x {product?.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="w-full flex flex-col items-center">
                    {item?.type === "GIFT_BOX" && "Qty : 1"}

                    {item?.type !== "GIFT_BOX" && (
                      <div className="flex justify-between items-center w-full">
                        <button
                          className="control-button2 !w-full"
                          onClick={() =>
                            handleQuantityChange(
                              item._id,
                              item?.products[0]?._id,
                              -1
                            )
                          }
                          disabled={item?.products[0].quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item?.products[0].quantity}</span>
                        <button
                          className="control-button2 w-full"
                          onClick={() =>
                            handleQuantityChange(
                              item._id,
                              item?.products[0]?._id,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    )}

                    <button
                      className="control-button2 !m-0"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td>LKR {getTotal(item)}</td>
                  <td>
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      onChange={() =>
                        handleCheckChange(item._id, getTotal(item))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totals-container">
            <h4 style={{ textAlign: "right" }}>Subtotal: LKR {overallTotal}</h4>
            <h4 style={{ textAlign: "right" }}>
              Selected Total: LKR {subtotal}
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
