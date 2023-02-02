const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router();

// Route for getting all products
router.route("/products").get(getAllProducts);

// Route for posting a new product
router.route("/products/new").post(createProduct);

// Route for updating & deleting & getting details for a product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);



module.exports = router;