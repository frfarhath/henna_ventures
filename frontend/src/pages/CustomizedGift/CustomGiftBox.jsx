import React, { useState } from "react";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/Product/ProgressBar";
import GoBackFooter from "../../components/Product/GoBackFooter";
import { useSelector } from "react-redux";
import SelectGiftBox from "./SelectGiftBox";
import SelectGift from "./SelectGift";
import SelectCard from "./SelectCard";
import Message from "./Message";

const CustomGiftBox = () => {
  const [current, setCurrent] = useState(1);
  const { giftBox, products, card, message } = useSelector(
    (state) => state.giftBox
  );

  const handleNext = () => {
    //check if current is 1 and giftBox is selected
    if (current === 1 && !giftBox?.name) {
      alert("Please select a gift box");
      return;
    }
    //check if current is 2 and at least 3 products or quantity is selected
    const productCount = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    if (current === 2 && productCount < 3) {
      alert("Please select at least 3 products or quantities");
      return;
    }
    //check if current is 3 and card is selected
    if (current === 3 && !card) {
      alert("Please select a card");
      return;
    }

    //check if current is 4 and message is entered
    if (current === 4 && (!message || message?.trim() === "")) {
      alert("Please enter a message");
      return;
    }

    setCurrent(current + 1);
  };

  const handleBack = () => {
    setCurrent(current - 1);
  };
  const total =
    giftBox?.price +
      products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ) || 0;

  return (
    <div>
      <NewNav />
      <h2 className="font-comic text-4xl mb-[20px] mt-5 text-left pl-8">
        Select Gift Box
      </h2>
      <ProgressBar value={0.25 * current} />

      {/* if current is 1 */}
      {current === 1 && <SelectGiftBox />}
      {/* if current is 2 */}
      {current === 2 && <SelectGift />}
      {/* if current is 3 */}
      {current === 3 && <SelectCard />}
      {/* if current is 4 */}
      {current > 3 && <Message />}

      {/* if current is 2 */}
      <GoBackFooter
        current={current}
        total={total}
        onNext={handleNext}
        onBack={handleBack}
      />
      <Footer />
    </div>
  );
};

export default CustomGiftBox;
