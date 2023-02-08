const mongoose = require("mongoose");


const connectDatabase = () => {

  mongoose
    .connect(process.env.DB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,              // All this is not needed in mongoose versions > 6
    })
    .then((data)=>{
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase; 