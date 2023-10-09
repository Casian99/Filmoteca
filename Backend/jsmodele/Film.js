const mongoose = require("mongoose");

const SchemaFilm = new mongoose.Schema({
    numefilm:{type:String, required:true, unique:true},
    descriere:{type:String},
    imagine:{type:String},
    imaginemare:{type:String},
    imaginemica:{type:String},
    trailer:{type:String},
    video:{type:String},
    an:{type:String},
    varsta:{type:Number},
    gen:{type:String},
    eSerial:{type:Boolean, default:false}
}, {timestamps:true});


module.exports = mongoose.model("Film", SchemaFilm);