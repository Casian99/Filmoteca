const jwt = require("jsonwebtoken");

function valideaza(cerere, raspuns, next) {
    const headerAutentificare = cerere.headers.token;
    if(headerAutentificare) {
        const token = headerAutentificare.split(" ")[1];

        jwt.verify(token, process.env.CHEIE_JWT, (eroare, user) => {
            if (eroare) {
                raspuns.status(403).json("Token invalid!");
                return;
            }else {
                cerere.user = user;
                next();
            }
        });
    } else{
        return raspuns.status(401).json("Nu sunteti autentificat.");
    }
}

module.exports = valideaza;