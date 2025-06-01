const Order = require("../models/order");
const axios = require("axios");

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.userId;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "You cannot make an order without products" });
    }

    for (const item of products) {
      const response = await axios.get(
        `http://product-service:5001/api/products/${item.productId}`
      );
      const product = response.data;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }
    }

    // All items are available. Deduct stock.
    for (const item of products) {
      await axios.patch(
        `http://product-service:5001/api/products/${item.productId}/decrease`,
        {
          quantity: item.quantity,
        }
      );
    }

    // Create the order
    const order = await Order.create({ userId, products });
    res.status(201).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error placing order", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};
