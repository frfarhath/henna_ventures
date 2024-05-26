import React from 'react';
import { useLocation } from 'react-router-dom';

function CartPage() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}
              <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
