import React, { useEffect, useState } from "react";
import "../../css/product.css";
import GiftProductCard from "../../components/Product/GiftProductCard";
import SearchBar from "../../components/Product/SearchBar";
import CustomGiftBoxModel from "../../components/Product/CustomGiftBoxModel";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../state/giftBoxSlice";
import axios from "axios";

export default function SelectGift() {
  const { products } = useSelector((state) => state.giftBox);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [product, setProduct] = useState(null);
  const [, setIsPopupOpen] = useState(false);

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
        setProductsArray(productsArray);
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
      <div className="header">
        <div className="flex flex-col sm:flex-row w-full justify-between xl:ps-16">
          <SearchBar onSearch={handleSearch} />
          <select
            className="filter me-5 xl:me-20"
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            <option value="Henna Products">Henna Products</option>
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Haldi">Haldi</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Graduation">Garduation</option>
          </select>
        </div>
      </div>

      {/* selected items */}
      <div className="flex gap-3 flex-wrap border-2 mx-4 rounded-md p-3 xl:mx-20">
        {products.map((product, index) => (
          <div key={index} className="selected-item w-32 h-32 relative">
            <img
              src={productsArray.find((p) => p.name === product.name).images[0]}
              alt={product.name}
              className="rounded-md w-full h-28 object-cover"
            />
            {/* close button */}
            <button
              className="absolute top-1 right-1 h-6 w-6 bg-black text-white rounded-full p-0.5"
              onClick={() => dispatch(removeProduct(product.name))}
            >
              &times;
            </button>
            {/* quantity */}
            <p className="bg-black text-center text-white rounded-b-md w-full">
              Qty : {product.quantity}
            </p>
          </div>
        ))}
        {products?.length === 0 && (
          <p className="text-center py-1 w-full mb-0">No products selected</p>
        )}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <GiftProductCard
            key={index}
            imgmehendi={product.images[0]}
            productname={product.name}
            productdes={product.category}
            price={product.price}
            onViewProduct={() => {
              setProduct(product);
              setIsPopupOpen(true);
            }}
          />
        ))}
      </div>
      <CustomGiftBoxModel
        product={product}
        onClose={() => {
          setProduct(null);
          setIsPopupOpen(false);
        }}
      />
    </div>
  );
}
