const express = require("express");

const cors = require("cors");

const aplicatie = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const rutaAutentificare = require("./rute/autentificare");

const rutaUser = require("./rute/useri");

const rutaFilm = require("./rute/filme");

const rutaLista = require("./rute/liste");


dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Conexiune DB reusita")).catch((eroare) => console.log(eroare)); 

aplicatie.use(express.json());
aplicatie.use(cors());

aplicatie.use("/Backend/autentificare", rutaAutentificare);
aplicatie.use("/Backend/useri", rutaUser);
aplicatie.use("/Backend/filme", rutaFilm);
aplicatie.use("/Backend/liste", rutaLista);


aplicatie.listen(8800, ()=>{ 
    console.log("Serverul ruleaza")
});