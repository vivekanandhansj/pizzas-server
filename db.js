const mongoose = require("mongoose");
require("dotenv").config;

mongoose.connect(
 
  "mongodb+srv://vivek:vivek@shopping-cart.7evo1lb.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("db connected");
});
db.on("error", () => {
  console.log("db error");
});
