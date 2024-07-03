import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/product.css";
import CardSelect from "../../components/Product/CardSelect";
import imgwish1 from "../../images/CustomizedGift/wish1.jpg";
import imgwish2 from "../../images/CustomizedGift/wish2.jpg";
import imgwish3 from "../../images/CustomizedGift/wish3.jpg";
import imgwish4 from "../../images/CustomizedGift/wish4.jpg";
import imgwish5 from "../../images/CustomizedGift/wish5.jpg";
import imgwish6 from "../../images/CustomizedGift/wish6.jpg";
import imgwish7 from "../../images/CustomizedGift/wish7.jpg";
import imgwish8 from "../../images/CustomizedGift/wish8.jpg";
import imgwish9 from "../../images/CustomizedGift/wish9.jpg";
import imgwish10 from "../../images/CustomizedGift/wish10.jpg";
import imgwishlogo from "../../images/CustomizedGift/wish-logo.jpg";
import imgwishnone from "../../images/CustomizedGift/wish-none.jpg";
import ProgressBar from "../../components/Product/ProgressBar";
import GoBackFooter from "../../components/Product/GoBackFooter";

export default function SelectCard(value) {
  const [total, setTotal] = useState(0);

  const handleNext = () => {
    console.log("Next button clicked");
    window.location.href = "http://localhost:3000/message";
  };

  const handleBack = () => {
    console.log("Go Back button clicked");
    window.location.href = "http://localhost:3000/selectgift";
  };

  return (
    <div>
      <NewNav />
      <h2>Select Wish Card</h2>
      <ProgressBar value={0.75} />
      <div className="product-grid">
        <CardSelect imgwish={imgwish1} />
        <CardSelect imgwish={imgwish2} />
        <CardSelect imgwish={imgwish3} />
        <CardSelect imgwish={imgwish4} />
        <CardSelect imgwish={imgwish5} />
        <CardSelect imgwish={imgwish6} />
        <CardSelect imgwish={imgwish7} />
        <CardSelect imgwish={imgwish8} />
        <CardSelect imgwish={imgwish9} />
        <CardSelect imgwish={imgwish10} />
        <CardSelect imgwish={imgwishlogo} />
        <CardSelect imgwish={imgwishnone} />
      </div>
      <GoBackFooter total={total} onNext={handleNext} onBack={handleBack} />
      <Footer />
    </div>
  );
}
