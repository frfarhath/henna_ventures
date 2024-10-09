import React from "react";
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

export default function SelectCard(value) {
  return (
    <div>
      <div className="product-grid">
        <CardSelect imgwish={imgwish1} type={1} />
        <CardSelect imgwish={imgwish2} type={2} />
        <CardSelect imgwish={imgwish3} type={3} />
        <CardSelect imgwish={imgwish4} type={4} />
        <CardSelect imgwish={imgwish5} type={5} />
        <CardSelect imgwish={imgwish6} type={6} />
        <CardSelect imgwish={imgwish7} type={7} />
        <CardSelect imgwish={imgwish8} type={8} />
        <CardSelect imgwish={imgwish9} type={9} />
        <CardSelect imgwish={imgwish10} type={10} />
        <CardSelect imgwish={imgwishlogo} type={11} />
        <CardSelect imgwish={imgwishnone} type={12} />
      </div>
    </div>
  );
}
