const mongoose = require("mongoose");

const SchemaLista = new mongoose.Schema({
    numelista:{type:String, required:true, unique:true},
    tip:{type:String},
    gen:{type:String},
    continut:{type:Array}
}, {timestamps:true});


module.exports = mongoose.model("Lista", SchemaLista);