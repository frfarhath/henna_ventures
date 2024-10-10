const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  //type of order : enum PRODUCT or GIFT_BOX
  type: {
    type: String,
    enum: ["PRODUCT", "GIFT_BOX"],
    default: "PRODUCT",
    required: true,
  },
  giftBox: {
    name: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: false,
      },
    },
  ],
  card: {
    type: Number,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
});

exports.Cart = mongoose.model("cart", CartSchema);
