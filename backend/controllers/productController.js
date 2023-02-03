const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Product (for Admin)
exports.createProduct = catchAsyncErrors (async (req, res, next) => {
   const product = await Product.create(req.body);

   res.status(201).json({
      success:true,
      product
   })
});  

// Get all product
exports.getAllProducts = catchAsyncErrors (async (req, res) => {
  
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)      // 'req.query' is basically '..?keyword=xyz' part of the url
    .search()
    .filter()
    .pagination(resultPerPage);    

  const products = await apiFeature.query;

  res.status(200).json({
    success:true,
    products,
    productsCount
  })
});

// Get a single product details
exports.getProductDetails = catchAsyncErrors (async (req, res, next) => {
  
  const product = await Product.findById(req.params.id);

  // Takes care if product not found 
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product
  });
});

// Updating a product (for Admin)
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
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

});

// Deleting a product (for Admin)
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});