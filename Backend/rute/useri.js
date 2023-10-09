const router = require("express").Router();

const User = require("../jsmodele/User");

const CryptoJS = require("crypto-js");

const valideaza = require("../validareToken");


//UPDATE ??

router.put("/:id", valideaza, async(cerere, raspuns) => {
    if(cerere.user.id === cerere.params.id || cerere.user.rol){
        if(cerere.body.parola){
            cerere.body.parola = CryptoJS.AES.encrypt(cerere.body.parola, process.env.CHEIE_SECRETA).toString();
        }

        try{
            const userUpdate = await User.findByIdAndUpdate( cerere.params.id, { $set: cerere.body }, { new: true} );
            raspuns.status(200).json(userUpdate);

        } catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Puteti face update doar contului dumneavoastra.");
    }
});



//STERGE

router.delete("/:id", valideaza, async(cerere, raspuns) => {
    if(cerere.user.id === cerere.params.id || cerere.user.rol){
        try{
            await User.findByIdAndDelete(cerere.params.id);
            raspuns.status(200).json("Userul a fost sters cu succes.");

        } catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Puteti sterge doar contul dumneavoastra.");
    }
});


//GET ??

router.get("/find/:id", async(cerere, raspuns) => {
        try{
            const user = await User.findById(cerere.params.id);
            const { parola, ...detalii }  = user._doc;
            raspuns.status(200).json(detalii);

        } catch(eroare){
            raspuns.status(500).json(eroare);
        }
});

//GET ALL ??

router.get("/", valideaza, async(cerere, raspuns) => {
    const interogare = cerere.query.new;
    if(cerere.user.rol){
        try{
            let all;
            if (interogare) {
                all = await User.find().limit(5);        //putem folosi si sort() iar ca parametru sa-i dam in functie de id. 
            } else {
                all = await User.find();
            }

            raspuns.status(200).json(all);

        } catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu puteti executa aceasta comanda daca nu sunteti admin.");
    }
});

//GET USER STATS ??

// router.get("/detalii", async(cerere, raspuns) =>{
//     const ziCurenta = new Date();
//     const ultimaLuna = ziCurenta.setMonth(ziCurenta.setMonth() - 1);
// });


module.exports = router;