const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

// Resetting the Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash as we need to find the user with the same token but we've stored the token in a hashed form
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)     // request.params.token comes from the url that's been sent via email and which the user follows to reset the password
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,     // since the property and its value have same variable names you can just write it the way it has been written
    resetPasswordExpire: { $gt: Date.now() },     // basically checks whether the expired time is '$gt - greater than' 'now' and only returns those users
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Passwords do not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);    // To make the user log in
});

// Getting User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);   // Since only those users who're logged in are allowed to get their details we're bound to find that user and hence there's no condition that handles 'if no user found'

  res.status(200).json({
    success: true,
    user,
  });
});

// Changing User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");    // changes the 'select' field to 'true' which is 'false' by default. We do this as we need the password field too here.

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("passwords do not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Updating User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Avatar will be taken care of later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});