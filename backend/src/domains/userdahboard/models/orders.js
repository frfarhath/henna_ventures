const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
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
  total: {
    type: Number,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientAddress: {
    type: String,
    required: true,
  },
  recipientContact: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID", "DELIVERED", "CANCELLED"],
    default: "PENDING",
    required: true,
  },
});

exports.Orders = mongoose.model("orders_", OrderSchema);
