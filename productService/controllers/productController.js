const { default: mongoose } = require("mongoose");
const Product = require("../models/product");

// GET /products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json({ status: "success", data: products });
};

// GET /products/:id
exports.getProduct = async (req, res) => {
  const { id } = req.params;

  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json({ status: "success", data: product });
};

// POST /products
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ status: "success", data: product });
};

exports.decreaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.stock -= quantity;
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating stock", error: err.message });
  }
};
