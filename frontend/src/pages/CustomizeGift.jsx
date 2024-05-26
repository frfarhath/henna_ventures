import React from 'react'
import NewNav from '../components/NewNav'
import Footer from '../components/Footer';
import "../css/product.css";
import imggift from '../images/Products/gift.jpg'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function CustomizeGift() {
  return (
    <div>
      <NewNav/>
      <h2>Customize Gifts for your Loved Ones</h2>
      <button className="cart-button">
      <FontAwesomeIcon icon={faPlus} /> Add Gift
    </button>
    
    <img style={{ width: 300, height: 450, }}
        className="gift" src={imggift} alt="Gift"/>
        
      
      <Footer/>

    </div>
  )
}
