import React, { useState } from "react";
import "../../css/product.css";
import GiftProductCard from "../../components/Product/GiftProductCard";
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
import SearchBar from "../../components/Product/SearchBar";
import CustomGiftBoxModel from "../../components/Product/CustomGiftBoxModel";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../state/giftBoxSlice";

const productsList = [
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

export default function SelectGift() {
  const { products } = useSelector((state) => state.giftBox);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(productsList);
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
              src={productsList.find((p) => p.name === product.name).img}
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
            imgmehendi={product.img}
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
