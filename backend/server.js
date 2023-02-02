const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// Handling Uncaught Exception -- Defined at the top because it can then handle all the errors (errors like if some variable isn't defined for instance)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({path:"backend/config/config.env"});

// Connecting to database 
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {      // 'unhandledRejection' is the event name
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});