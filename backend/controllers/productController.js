const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");



//Create Product (for Admin)
exports.createProduct = async (req, res, next) => {
   const product = await Product.create(req.body);

   res.status(201).json({
      success:true,
      product
   })
}  

// Get all product
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success:true,
    products
  })
}

// Get a single product details
exports.getProductDetails = async (req, res, next) => {
  
  const product = await Product.findById(req.params.id);

  // Takes care if product not found 
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product
  });
};

// Updating a product (for Admin)
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify: false
  });

  res.status(200).json({
    success:true,
    products
  });

};

// Deleting a product (for Admin)
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};