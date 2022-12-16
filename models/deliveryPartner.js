const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require,
  },
  phonenumber: {
    type: String,
    require,
  },
  password: {
    type: String,
    require,
  },
});

const userModel = mongoose.model("deliveryPartner", userSchema);
module.exports = userModel;
