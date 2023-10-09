const router = require("express").Router();

const Film = require("../jsmodele/Film");

const valideaza = require("../validareToken");


//CREATE

router.post("/", valideaza, async(cerere, raspuns) => {
    if(cerere.user.rol){
        const filmNou = new Film(cerere.body);

        try{
            
            const film = await filmNou.save();
            raspuns.status(200).json(film);

        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu sunteti autorizat pentru aceasta operatiune.");
    }
});

//Update

router.put("/:id", valideaza, async(cerere, raspuns) => {
    if(cerere.user.rol){
        try{
            
            const filmUpdate = await Film.findByIdAndUpdate(req.params.id, { $set: cerere.body }, { new: true});
            raspuns.status(200).json(filmUpdate);

        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu sunteti autorizat pentru aceasta operatiune.");
    }
});



//DELETE

router.delete("/:id", valideaza, async(cerere, raspuns) => {
    if(cerere.user.rol){
        try{
            await Film.findByIdAndDelete(cerere.params.id);
            raspuns.status(200).json("Filmul a fost sters cu succes.");
        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu sunteti autorizat pentru aceasta operatiune.");
    }
});  //????????


//get


router.get("/find/:id", valideaza, async(cerere, raspuns) => {
        try{
            const film = await Film.findById(cerere.params.id);
            raspuns.status(200).json(film);
        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
});


//get aleator

router.get("/aleator", valideaza, async(cerere, raspuns) => {
    const tip = cerere.query.tip;
    let film;
    try{
        if(tip==="film"){
            film = await Film.aggregate([ {$match: { eSerial: false }}, {$sample: { size:1} } ]);
        } else{
            film = await Film.aggregate([ {$match: { eSerial: true }}, {$sample: { size:1} } ]);
        }
        raspuns.status(200).json(film);
    }catch(eroare){
        raspuns.status(500).json(eroare);
    }
});


//get all

router.get("/", valideaza, async(cerere, raspuns) => {
    if(cerere.user.rol){
        try{
            const filme = await Film.find();
            raspuns.status(200).json(filme);
        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu sunteti autorizat pentru aceasta operatiune.");
    }
});


module.exports = router;