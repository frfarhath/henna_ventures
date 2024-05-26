import React from 'react'
import NewNav from '../components/NewNav'
import ProductCard from '../components/ProductCard'
import "../css/product.css";
import Footer from '../components/Footer';
import imgmehendi1 from '../images/Products/mehendi1.jpg'
import imgmehendi2 from '../images/Products/mehendi2.jpg'
import imgmehendi3 from '../images/Products/mehendi3.jpg'
import imgmehendi4 from '../images/Products/mehendi4.jpg'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ProductPage() {
  return (
    <div>
      <NewNav/>
      <h2>Products</h2>
      <button className="cart-button">
      <FontAwesomeIcon icon={faShoppingCart} /> Go to Cart
      </button>
      <div className="product-grid">
      <ProductCard imgmehendi={imgmehendi2} productname="Cone" productdes="Des" price="100" />
      <ProductCard imgmehendi={imgmehendi1} productname="Cone" productdes="Des" price="100" />
      <ProductCard imgmehendi={imgmehendi3} productname="Cone" productdes="Des" price="100" />
      <ProductCard imgmehendi={imgmehendi4} productname="Cone" productdes="Des" price="100" />
      </div>
      <Footer/>
    </div>
  )
}
