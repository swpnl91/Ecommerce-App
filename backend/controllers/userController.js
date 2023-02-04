const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");


// Registering a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "profilepicurl"
    }
  });

  const token = user.getJWTToken();

  res.status(201).json({
    success:true,
    token
  });
});

// User Log in
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check whether the user has provided both the password and email
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  // If we get both then we check whether the user exists in the database or not
  // since for password we've used 'select: false' we need to get it the following way
  const user = await User.findOne({ email }).select("+password");  // since both the property and value are same we can also just write 'email'

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success:true,
    token
  });
});