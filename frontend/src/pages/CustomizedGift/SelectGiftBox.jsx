import React from "react";
import "../../css/product.css";
import Package from "../../components/Product/Package";
import imgpackage1 from "../../images/Products/package1.jpg";
import imgpackage2 from "../../images/Products/package2.jpg";
import imgpackage3 from "../../images/Products/package3.jpg";
import imgpackage4 from "../../images/Products/package4.jpg";

const packageArray = [
  {
    img: imgpackage1,
    name: "Brown | CardBoard Box",
    price: 400,
  },
  {
    img: imgpackage2,
    name: "White | CardBoard Box",
    price: 400,
  },
  {
    img: imgpackage3,
    name: "Pink | CardBoard Box",
    price: 600,
  },
  {
    img: imgpackage4,
    name: "Light Blue | CardBoard Box",
    price: 600,
  },
];

export default function SelectGiftBox() {
  return (
    <div className="product-grid">
      {packageArray.map((item, index) => (
        <Package
          key={index}
          imgpackage={item.img}
          productname={item.name}
          price={item.price}
        />
      ))}
    </div>
  );
}
