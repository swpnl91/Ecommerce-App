const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


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

  sendToken(user, 201, res);
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

  sendToken(user, 200, res);
});

// User Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();   // getResetPasswordToken method called that returns the token

  await user.save({ validateBeforeSave: false });    // This is done to save the newly created token and its expiry with the user as both the things are newly created 

  // Creating a link to be sent for resetting the password
  const resetPasswordUrl = `${req.protocol}://${req.get(   
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;     // We need to remove the newly generated token if there's an error and again save the user
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});