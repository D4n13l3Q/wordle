// Librerie

import fs from "fs";



// Funzioni

const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;



const countOccurrences = (array) => array.reduce(
    function(occurrences, item) {
        occurrences.hasOwnProperty(item) ? occurrences[item]++ : occurrences[item] = 1; // Se "occurrences" ha già una proprietà proprietà chiamata come il valore di "item" la incremento, altrimenti la aggiungo impstandola ad 1.
        return occurrences;
    },
    {} // Valore inziale per "occurrences" (oggetto vuoto).
);



/*
const countOccurrences = function (array, item, occurrences = 0) {

    let index = array.indexOf(item);

    if (index < 0)
        return occurrences;
    else
        return countOccurrences(array.slice(index + 1), item, occurrences + 1);

}
*/



const getWords = function(file) { // "file" = nome file e/o path.
        
    let words = [];
    
    try {
    
        let data = fs.readFileSync(file, 'utf8');
        
        // 1) Divido "data" in un array usando come separatore un qualsiasi numero di newline e/o carriage return (così anche file che sono stati editati sia in Windows che in qualunque-altro-sistema-operativo dovrebbero poter essere letti >
        
        // 2) Creo un secondo array dove tengo solo gli elementi che, dopo essere stati "trimmati", non sono ne stringa vuota ne iniziano per cancelletto. Tutti gli altri elementi diventano array vuoti.
        // 3) Appiattisco l'array di un livello eliminando tutti gli elementi che sono array vuoti.
        
        // oppure
        
        // 2 + 3) "flatMap" esegue i punti 2 e 3 insieme più velocemente e consumando meno memoria (ma potrebbe non essere supportato ovunque pechè è relativamente recente).
        
        //words = data.split(/(?:\r|\n)+/).map(item => (item = item.trim()) && item[0] !== "#" ? item : []).flat(); // 1, 2, 3.
        words = data.split(/(?:\r|\n)+/).flatMap(item => (item = item.trim()) && item[0] !== "#" ? item : []); // 1, 2 + 3.
        
    } catch (exception) {
        
        console.error(exception.message);
        
        process.exit(1);
        
    }
    
    return words;
    
}



// Exports

export {
    randomInt,
    countOccurrences,
    getWords
};
