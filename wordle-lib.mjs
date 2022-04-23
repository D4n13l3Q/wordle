// Librerie

import fs from "fs";



// Funzioni

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
    getWords
};
