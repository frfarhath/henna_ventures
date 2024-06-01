const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {type : String, unique: true },
    password: String,
    token: String,
    phone:String,
    verified: { type: Boolean, default: false },
    
});

const User = mongoose.model('User', UserSchema);
module.exports = User;