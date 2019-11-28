var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    tel:String,
    pass:String,
    imgurl:String,
    gender:{
        type:String,
        default:"女"
    },
    age:Number,
    date:{
        type:Date,
        default:Date.now
    }
})
var UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;