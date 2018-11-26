/*
Imports & configs
*/
const jwt = require('jsonwebtoken');
//

/*
Créer une fonction pour vérifier les données d'une requête
*/
const checkFields = ( required, reqBody ) => {
    // Création de tableau pour les champs manquants ou en trop
    let miss = [];
    let extra = [];

    // Vérifier qu'il ne manque pas de champs
    required.forEach( prop => {
        if( !(prop in reqBody) ) {
            console.log('MISS', prop)
            miss.push(prop)
        };
    });

    // Vérifier les champs en trop
    for( const prop in reqBody ){
        if( required.indexOf(prop) === -1 && prop != 'token') {
            console.log('EXTRA', prop)
            extra.push(prop)
        };
        
    };

    // Vérifier les champs
    const ok = ( extra.length === 0 && miss.length === 0 );

    // Renvoyer le résultat
    return { ok, extra, miss };
}

const isConnected = (token) => {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(err)
            console.log(decoded)
            resolve(decoded)
        })
    })
}
//

/*
Exporter le module du service
*/
module.exports = { checkFields, isConnected };
//