const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],   // validator package basically helps in validating the email
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,      // 'select: false' ensures that this field is not returned when the admin is trying to seek information regarding the users
  },
  avatar: {        // is an object (unlike array for images of products because a user has only 1 avatar )
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {     // To identify whether a user is an admin or a customer
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// This is done BEFORE ('pre' keyword) every edit. "save" is an event
userSchema.pre("save", async function (next) {    // arrow function isn't used because 'this' is used.
  
  // This condition ensures that the password is hashed/encrypted ONLY IF password is what's edited/changed by the user and not other things like 'avatar', 'name' etc.
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);  // '10' represents the power. Higher the number more secured the password
});


module.exports = mongoose.model("User", userSchema);