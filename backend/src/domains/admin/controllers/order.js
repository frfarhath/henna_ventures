const { Orders } = require("../../userdahboard/models/orders");

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Orders.find(); // Fetches all orders from the database
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};


// Update order status
// Controller file
exports.updateOrderStatus = [
  async (req, res) => {
    try {
      const { status } = req.body;
      const { orderId } = req.params;

      // Find the order by its ID
      const order = await Orders.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if the status is valid
      const validStatus = ["PENDING", "PAID", "DELIVERED", "CANCELLED"];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Update the order status
      order.status = status;
      await order.save();

      res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Delete an order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Orders.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


