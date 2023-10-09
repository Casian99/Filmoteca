const mongoose = require("mongoose");

const SchemaUser = new mongoose.Schema({
    numeuser:{type:String, required:true, unique:true},
    mail:{type:String, required:true, unique:true},
    parola:{type:String, required:true},
    poza:{type:String, default:""},
    rol:{type:Boolean, default:false}     //admin or user
}, {timestamps:true});


module.exports = mongoose.model("User", SchemaUser);