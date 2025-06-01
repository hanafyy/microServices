const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProduct);
router.post("/", controller.createProduct);
router.patch("/:id/decrease", controller.decreaseStock);

module.exports = router;
