import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "../../css/product.css";
import Package from "../../components/Product/Package";
import imgpackage1 from "../../images/Products/package1.jpg";
import imgpackage2 from "../../images/Products/package2.jpg";
import imgpackage3 from "../../images/Products/package3.jpg";
import imgpackage4 from "../../images/Products/package4.jpg";
import ProgressBar from "../../components/Product/ProgressBar";
import GoBackFooter from "../../components/Product/GoBackFooter";

export default function SelectGiftBox() {
  const [totalprice, setTotalprice] = useState(0);

  const handleNext = () => {
    console.log("Next button clicked");
    window.location.href = "http://localhost:3000/selectgift";
  };

  const handleBack = () => {
    console.log("Go Back button clicked");
    window.location.href = "http://localhost:3000/product";
  };

  const handleSelectBox = (amount) => {
    setTotalprice(totalprice + amount);
  };

  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-[20px] mt-5 text-left pl-8">Select Gift Box</h2>
      <ProgressBar value={0.25} />
      <div className="product-grid">
        <Package
          imgpackage={imgpackage1}
          productname="Brown | CardBoard Box"
          onClick={() => handleSelectBox(500)}
        />
        <Package
          imgpackage={imgpackage2}
          productname="White | CardBoard Box"
          onClick={() => handleSelectBox(500)}
        />
        <Package
          imgpackage={imgpackage3}
          productname="Pink | CardBoard Box"
          onClick={() => handleSelectBox(800)}
        />
        <Package
          imgpackage={imgpackage4}
          productname="Light Blue | CardBoard Box"
          onClick={() => handleSelectBox(800)}
        />
      </div>
      <GoBackFooter
        total={totalprice}
        onNext={handleNext}
        onBack={handleBack}
      />
      <Footer />
    </div>
  );
}
