const router = require("express").Router();

const Lista = require("../jsmodele/Lista");

const valideaza = require("../validareToken");


//CREATE

router.post("/", valideaza, async(cerere, raspuns) => {
    if(cerere.user.rol){
        const listaNoua = new Lista(cerere.body);

        try{
            
            const lista = await listaNoua.save();
            raspuns.status(200).json(lista);

        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu sunteti autorizat pentru aceasta operatiune.");
    }
});


//delete

router.delete("/:id", valideaza, async(cerere, raspuns) => {
    if(cerere.user.rol){
        try{
            
            await Lista.findByIdAndDelete(cerere.params.id);
            raspuns.status(200).json("Lista a fost stearsa cu succes.");

        }catch(eroare){
            raspuns.status(500).json(eroare);
        }
    } else{
        raspuns.status(403).json("Nu sunteti autorizat pentru aceasta operatiune.");
    }
});

//get

router.get("/", valideaza, async(cerere, raspuns) => {
    const interogareTip = cerere.query.tip;
    const interogareGen = cerere.query.gen;
    let lista = [];

    try{
        if(interogareTip){
            if(interogareGen){
                lista = await Lista.aggregate([{ $sample: { size: 10 } }, { $match: { tip: interogareTip, gen: interogareGen }} ]);
            } else{
                lista = await Lista.aggregate([{ $sample: { size: 10 } }, { $match: { tip: interogareTip }} ]);
            }
        }else{
            lista = await Lista.aggregate([ { $sample: { size: 10 } } ]);
        }

        raspuns.status(200).json(lista);

    }catch(eroare){
        raspuns.status(500).json(eroare);
    }

});


module.exports = router;