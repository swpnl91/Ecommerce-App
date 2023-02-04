const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// Route for getting all products
router.route("/products").get(getAllProducts);

// Route for posting a new product
router.route("/products/new").post(isAuthenticatedUser, createProduct);

// Route for updating & deleting & getting details for a product
router.route("/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails);



module.exports = router;