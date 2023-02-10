const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Product (for Admin)
exports.createProduct = catchAsyncErrors (async (req, res, next) => {
  
  req.body.user = req.user.id;  // Adding user field with id of the user who created the product 
  
  const product = await Product.create(req.body);

   res.status(201).json({
      success:true,
      product
   })
});  

// Get all products
exports.getAllProducts = catchAsyncErrors (async (req, res, next) => {

  // const allProducts = await Product.find();

  // // Takes care if products not found 
  // if (2 === 2) {
  //   return next(new ErrorHandler("Products Not Found", 500));
  // }

  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)      // 'req.query' is basically '..?keyword=xyz' part of the url
    .search()
    .filter()
    .pagination(resultPerPage);    

  const products = await apiFeature.query;

  res.status(200).json({
    success:true,
    products,
    productsCount,
    resultPerPage
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

// Creating a new Review or Updating the existing Reviews
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),      // wrapped in 'Number(rating)' to convert it to a number
    comment        // property name and its value name are same hence written like that
  };

  const product = await Product.findById(productId);

  // This basically uses the .find() method (loops through each element) on the 'reviews' array in 'product' in order to find whether the existing user has already reviewed the concerned product or not 
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);           // 'reviews' is a property that has an array as its value in 'product' 
    product.numOfReviews = product.reviews.length;    // increases the number of reviews if there is a new entry
  }

  // Taking care of the overall rating
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Getting all Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Deleting a Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(      // we basically store all the reviews that we want in 'reviews'
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});