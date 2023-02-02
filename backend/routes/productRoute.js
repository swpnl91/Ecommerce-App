const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/productController");

const router = express.Router();

// Route for getting all products
router.route("/products").get(getAllProducts);

// Route for posting a new product
router.route("/products/new").post(createProduct);

// Route for updating a product
router.route("/product/:id").put(updateProduct);


module.exports = router;