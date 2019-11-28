var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var childSchema = new Schema({
    name:String,
    birthday:String,
    gender:String,
    date:{
        type:Date,
        default:Date.now
    },
    uid:String
})
var ChildSchema = mongoose.model("childs",childSchema)
module.exports = ChildSchema;