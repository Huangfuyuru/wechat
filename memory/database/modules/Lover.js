var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var loverSchema = new Schema({
    name:String,
    ldate:String,
    gender:String,
    date:{
        type:Date,
        default:Date.now
    },
    uid:String
})

var LoverModel = mongoose.model("lovers",loverSchema);
module.exports = LoverModel