class ErrorHandler extends Error{      //Error is a class provided by node.js
  constructor(message,statusCode){
      super(message);    // 'super' is basically a constructor of 'Error' 
      this.statusCode = statusCode
      Error.captureStackTrace(this,this.constructor);  // 'captureStackTrace' is a method available on 'Error'
  } 
}

module.exports = ErrorHandler