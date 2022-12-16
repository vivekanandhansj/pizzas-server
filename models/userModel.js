const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        require,
        unique: true,
    },
    email:{
        type: String,
        unique: true,
        require
    },
    password:{
        type: String,
        require
    },
    isAdmin:{
        type: Boolean,
        require
    }
});
const userModel = mongoose.model("user",userSchema);
module.exports = userModel;