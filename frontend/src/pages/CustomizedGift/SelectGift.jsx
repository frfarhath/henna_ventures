import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/product.css";
import ProductCard from "../../components/Product/ProductCard";
import imgproduct1 from "../../images/Products/Product1.jpg";
import imgproduct2 from "../../images/Products/Product2.jpg";
import imgproduct3 from "../../images/Products/Product3.jpg";
import imgproduct4 from "../../images/Products/Product4.jpg";
import imgproduct9 from "../../images/Products/cusprod01.jpg";
import imgproduct10 from "../../images/Products/cusprod02.jpg";
import imgproduct11 from "../../images/Products/cusprod03.jpg";
import imgproduct12 from "../../images/Products/cusprod04.jpg";
import imgproduct13 from "../../images/Products/cusprod05.jpg";
import imgproduct14 from "../../images/Products/cusprod06.jpg";
import imgproduct15 from "../../images/Products/cusprod07.jpg";
import imgproduct16 from "../../images/Products/cusprod08.jpg";
import imgproduct17 from "../../images/Products/cusprod09.jpg";
import imgproduct18 from "../../images/Products/cusprod10.jpg";
import imgproduct19 from "../../images/Products/cusprod12.jpg";
import ProgressBar from "../../components/Product/ProgressBar";
import GoBackFooter from "../../components/Product/GoBackFooter";
import GiftModal1 from "../../components/Product/GiftModal1";
import GiftModal2 from "../../components/Product/GiftModal2";
import {
  faShoppingCart,
  faGift,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../components/Product/SearchBar";

export default function SelectGift( addToGiftBox) {
  const products = [
    {
      img: imgproduct1,
      name: "Ultra-Dark Henna Cone",
      price: 250,
      category: "Henna Products",
    },
    {
      img: imgproduct2,
      name: "Henna Aftercare Balm",
      price: 170,
      category: "Henna Products",
    },
    {
      img: imgproduct3,
      name: "Henna Selant",
      price: 170,
      category: "Henna Products",
    },
    {
      img: imgproduct4,
      name: "Nail Cone",
      price: 200,
      category: "Henna Products",
    },
    { img: imgproduct12, name: "Mehendi Tray", price: 3000, category: "Haldi" },
    {
      img: imgproduct13,
      name: "Wooden Couple Monogram",
      price: 2300,
      category: "Anniversary",
    },
    {
      img: imgproduct9,
      name: "Letter Monogram-Black",
      price: 1800,
      category: "Engagement",
    },
    {
      img: imgproduct10,
      name: "Nikah Glass Stand",
      price: 1600,
      category: "Wedding",
    },
    {
      img: imgproduct11,
      name: "5D Wooden Memo Frame",
      price: 2800,
      category: "Birthday",
    },
    {
      img: imgproduct14,
      name: "Wooden Engagement Plaque",
      price: 2200,
      category: "Engagement",
    },
    {
      img: imgproduct15,
      name: "Wooden-Hexagon Candle Stand",
      price: 1150,
      category: "Haldi",
    },
    {
      img: imgproduct16,
      name: "Resin Coaster - Wooden Ring",
      price: 1200,
      category: "Graduation",
    },
    {
      img: imgproduct17,
      name: "Wooden Bangle Stand",
      price: 2400,
      category: "Haldi",
    },
    {
      img: imgproduct18,
      name: "Resin Coaster Clock",
      price: 1200,
      category: "Birthday",
    },
    {
      img: imgproduct19,
      name: "3D Decor Frame",
      price: 950,
      category: "Anniversary",
    },
  ];

  const [total, setTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (category === "All" || product.category === category)
    );
    setFilteredProducts(filtered);
  };

  const handleClickButton1 = () => {
    console.log("View Gift Box");
  };

  const handleClickButton2 = () => {
    console.log("Go to Cart button clicked");
    window.location.href = "http://localhost:3000/cart";
  };

  const handleNext = () => {
    console.log("Next button clicked");
    window.location.href = "http://localhost:3000/selectcard";
  };

  const handleBack = () => {
    console.log("Go Back button clicked");
    window.location.href = "http://localhost:3000/giftbox";
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  const handleAddToGiftBox = (product, quantity) => {
    addToGiftBox(product, quantity);
    handleCloseModal();
  };

  const renderGiftBoxModal = () => {
    if (!selectedProduct) return null;

    const { category } = selectedProduct;

    if (category === "Henna Products" || category === "Reselling") {
      return (
        <GiftModal1
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToGiftBox}
        />
      );
    } else {
      return (
        <GiftModal2
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToGiftBox}
        />
      );
    }
  };
  return (
    <div>
      <NewNav />
      <h2>Select Gift Items</h2>
      <ProgressBar value={0.5} />
      <div className="header">
        <div className="separater">
          <SearchBar onSearch={handleSearch} />
          <button className="gift-button" onClick={handleClickButton1}>
            <FontAwesomeIcon icon={faGift} />
            View Gift Box
          </button>
          <select className="filter" onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Henna Products">Henna Products</option>
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Haldi">Haldi</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Graduation">Garduation</option>
          </select>
          <button className="cart-button" onClick={handleClickButton2}>
            <FontAwesomeIcon icon={faShoppingCart} /> Go to Cart
          </button>
        </div>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            imgmehendi={product.img}
            productname={product.name}
            price={product.price}
          />
        ))}
      </div>
      {renderGiftBoxModal()}
      <GoBackFooter total={total} onNext={handleNext} onBack={handleBack} />
      <Footer />
    </div>
  );
}
