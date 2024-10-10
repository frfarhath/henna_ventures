const { Cart } = require("../models/cart");

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Cart.find(); // Fetches all orders from the database
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};


// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        const order = await Cart.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Cart.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Fetch an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Cart.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};
