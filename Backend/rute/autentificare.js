const router = require("express").Router();

const User = require("../jsmodele/User");

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");

//INREGISTRARE
router.post("/register", async (cerere, raspuns) => {
    const userNou = new User({
        numeuser: cerere.body.numeuser,
        mail: cerere.body.mail,
        parola: CryptoJS.AES.encrypt(cerere.body.parola, process.env.CHEIE_SECRETA).toString()
    });

    try{
    const user = await userNou.save();
    raspuns.status(201).json(user);
    }catch(eroare){
        raspuns.status(500).json(eroare);
    }
});



//LOGARE


router.post("/login", async (cerere, raspuns) => {
    try{
        const user = await User.findOne({ mail: cerere.body.mail});
        if (!user) {
            raspuns.status(401).json("Parola sau numele de utilizator gresite.");
            return;
        }

        const bytes  = CryptoJS.AES.decrypt(user.parola, process.env.CHEIE_SECRETA);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        const tokenAcces = jwt.sign({id: user._id, rol: user.rol}, process.env.CHEIE_JWT, {expiresIn: "3d" });
        
        const { parola, ...detalii }  = user._doc;

        if(originalText !== cerere.body.parola){
            raspuns.status(401).json("Parola sau numele de utilizator gresite.");
            return;
        } else{
            raspuns.status(200).json({...detalii, tokenAcces});
            return;
        }

        

    } catch(eroare){ 
        raspuns.status(500).json(eroare);
    }
});


module.exports = router;