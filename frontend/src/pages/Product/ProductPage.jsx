import React, { useEffect, useState } from "react";
import NewNav from "../../components/NewNav";
import ProductCard from "../../components/Product/ProductCard";
import ProductModal1 from "../../components/Product/ProductModal1";
import ProductModal2 from "../../components/Product/ProductModal2"; // Import ProductModal2
import "../../css/product.css";
import Footer from "../../components/Footer";
import { faShoppingCart, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../components/Product/SearchBar";
import axios from "axios";

export default function ProductPage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const handleClickButton1 = () => {
    window.location.href = "http://localhost:3000/giftbox";
  };

  const handleClickButton2 = () => {
    window.location.href = "http://localhost:3000/cart";
  };

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

  const renderProductModal = () => {
    if (!selectedProduct) return null;

    const { category } = selectedProduct;

    if (category === "Henna Products" || category === "Reselling") {
      return (
        <ProductModal1 product={selectedProduct} onClose={handleCloseModal} />
      );
    } else {
      return (
        <ProductModal2 product={selectedProduct} onClose={handleCloseModal} />
      );
    }
  };

  const getProduct = async () => {
    await axios
      .get("http://localhost:8000/api/v1/admin/getProduct")
      .then(({ data }) => {
        let productsArray = [];
        data.forEach((product) => {
          productsArray.push({
            images: [product.image1, product.image2, product.image3],
            name: product.name,
            productdes: product.description,
            price: product.price,
            category: product.category,
          });
        });
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      })
      .catch(() => {
        console.log("Error fetching products");
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

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
          <button className="cart-button" onClick={handleClickButton2}>
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
}
