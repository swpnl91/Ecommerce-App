const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Route for getting all products
router.route("/products").get(getAllProducts);

// Route for posting a new product
router.route("admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// Route for updating & deleting
router.route("admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Route for getting details of a product
router.route("/product/:id").get(getProductDetails);

// Route for creating/updating product reviews
router.route("/review").put(isAuthenticatedUser, createProductReview);

module.exports = router;