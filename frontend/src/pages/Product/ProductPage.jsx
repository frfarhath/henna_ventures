import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import ProductCard from "../../components/Product/ProductCard";
import ProductModal1 from "../../components/Product/ProductModal1";
import ProductModal2 from "../../components/Product/ProductModal2";
import "../../css/product.css";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faGift } from "@fortawesome/free-solid-svg-icons";
import imgproduct1 from "../../images/Products/Product1.jpg";
import imgproduct2 from "../../images/Products/Product2.jpg";
import imgproduct3 from "../../images/Products/Product3.jpg";
import imgproduct4 from "../../images/Products/Product4.jpg";
import imgproduct5 from "../../images/Products/Product5.jpg";
import imgproduct6 from "../../images/Products/Product6.jpg";
import imgproduct7 from "../../images/Products/Product7.jpg";
import imgproduct8 from "../../images/Products/Product8.jpg";
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
import imgproduct20 from "../../images/Products/Product9.jpeg";
import SearchBar from "../../components/Product/SearchBar";

const ProductPage = ({ addToCart }) => {
  const products = [
    {
      images: [imgproduct1, imgproduct2, imgproduct3],
      name: "Ultra-Dark Henna Cone",
      productdes: "hello bjbfjjed c ndsbcj hbjssdn d hbdbwdw",
      price: "250",
      category: "Henna Products",
    },
    {
      images: [imgproduct2],
      name: "Henna Aftercare Balm",
      productdes: "hello",
      price: "170",
      category: "Henna Products",
    },
    {
      images: [imgproduct3],
      name: "Henna Sealant",
      productdes: "hello",
      price: "170",
      category: "Henna Products",
    },
    {
      images: [imgproduct4],
      name: "Nail Cone",
      productdes: "hello",
      price: "200",
      category: "Henna Products",
    },
    {
      images: [imgproduct20],
      name: "Ultra-Dark Henna Cone - 25 pack",
      productdes: "hello",
      price: "5000",
      category: "Reselling",
    },
    {
      images: [imgproduct12],
      name: "Mehendi Tray",
      productdes: "hello",
      price: "3000",
      category: "Haldi",
    },
    {
      images: [imgproduct13],
      name: "Wooden Couple Monogram",
      productdes: "hello",
      price: "2300",
      category: "Anniversary",
    },
    {
      images: [imgproduct9],
      name: "Letter Monogram-Black",
      productdes: "hello",
      price: "1800",
      category: "Engagement",
    },
    {
      images: [imgproduct10],
      name: "Nikah Glass Stand",
      productdes: "hello",
      price: "1600",
      category: "Wedding",
    },
    {
      images: [imgproduct11],
      name: "5D Wooden Memo Frame",
      productdes: "hello",
      price: "2800",
      category: "Birthday",
    },
    {
      images: [imgproduct14],
      name: "Wooden Engagement Plaque",
      productdes: "hello",
      price: "2200",
      category: "Engagement",
    },
    {
      images: [imgproduct15],
      name: "Wooden-Hexagon Candle Stand",
      productdes: "hello",
      price: "1150",
      category: "Haldi",
    },
    {
      images: [imgproduct16],
      name: "Resin Coaster - Wooden Ring",
      productdes: "hello",
      price: "1200",
      category: "Graduation",
    },
    {
      images: [imgproduct17],
      name: "Wooden Bangle Stand",
      productdes: "hello",
      price: "2400",
      category: "Haldi",
    },
    {
      images: [imgproduct18],
      name: "Resin Coaster Clock",
      productdes: "hello",
      price: "1200",
      category: "Birthday",
    },
    {
      images: [imgproduct19],
      name: "3D Decor Frame",
      productdes: "hello",
      price: "950",
      category: "Anniversary",
    },
    {
      images: [imgproduct5],
      name: "HDPE 2 Bottle",
      productdes: "hello",
      price: "50",
      category: "Reselling",
    },
    {
      images: [imgproduct6],
      name: "Craft Box",
      productdes: "hello",
      price: "25",
      category: "Reselling",
    },
    {
      images: [imgproduct7],
      name: "Amber Glass Bottle",
      productdes: "hello",
      price: "100",
      category: "Reselling",
    },
    {
      images: [imgproduct8],
      name: "Empty Spray Bottle",
      productdes: "hello",
      price: "50",
      category: "Reselling",
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

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

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    handleCloseModal();
  };

  const handleClickButton1 = () => {
    window.location.href = "http://localhost:3000/giftbox";
  };

  const renderProductModal = () => {
    if (!selectedProduct) return null;

    const { category } = selectedProduct;

    if (category === "Henna Products" || category === "Reselling") {
      return (
        <ProductModal1
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      );
    } else {
      return (
        <ProductModal2
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      );
    }
  };

  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-[20px] text-left pl-8">Products</h2>
      <div className="header">
        <div className="separater">
          <SearchBar onSearch={handleSearch} />
          <button className="gift-button" onClick={handleClickButton1}>
            <FontAwesomeIcon icon={faGift} />
            Customize Gift Box
          </button>
          <select className="filter" onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Henna Products">Henna Products</option>
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Haldi">Haldi</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Graduation">Graduation</option>
            <option value="Reselling">Other</option>
          </select>
          <button className="cart-button" onClick={() => navigate("/cart")}>
            <FontAwesomeIcon icon={faShoppingCart} /> Go to Cart
          </button>
        </div>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            imgmehendi={product.images[0]}
            productname={product.name}
            price={product.price}
            des={product.productdes}
            onViewProduct={() => handleViewProduct(product)}
          />
        ))}
      </div>
      {renderProductModal()}
      <Footer />
    </div>
  );
};

export default ProductPage;
