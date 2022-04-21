import readline from "readline";

import chalk from "chalk";



const secret = "rebus";




// Funzioni

const countOccurrences = (array) => array.reduce(
    function(occurrences, item) {
        occurrences.hasOwnProperty(item) ? occurrences[item]++ : occurrences[item] = 1; // Se "occurrences" ha già la proprietà "item" la incremento, altrimenti la aggiungo impstandola ad 1.
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


const check = function(input, secret) {
    
    input = input.toUpperCase().split("");   // Converto "input"...
    secret = secret.toUpperCase().split(""); // ...e "secret" in tutto maiuscolo e li divido in array di caratteri (in realtà array di stringhe da un carattere).
    
    let secretOccurrences = countOccurrences(secret);
    
    let guessed = true;
    
    let output = [];
    
    for (let i = 0; i < input.length; i++) {
        
        if (input[i] === secret[i]) {
            
            output[i] = chalk.green(input[i]);
            
            secretOccurrences[input[i]]--;
            
        } else {
            guessed = false;
        }
        
    }
    
    for (let i = 0; i < input.length; i++) {
        
        if (input[i] !== secret[i]) {
            if (secretOccurrences[input[i]] > 0) {
                
                // Giallo
                output[i] = chalk.yellow(input[i]);
                
                secretOccurrences[input[i]]--;
                
            } else {
                // Grigio
                output[i] = chalk.grey(input[i]);
            }
        }
        
    }
    
    return {
        output : output.join("-"),
        guessed : guessed
    };
    
}





const maxAttempts = 6;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = function(attempts, prompt = "Inserisci una parola: ") {
    
    if (attempts < 1) return rl.close(); // Se i tentativi rimasti sono meno di zero (zero è l'ultimo tetnativo valido) esco chiudendo readline.
    
    rl.question(prompt, (userInput) => {
        
        if (userInput.length !== secret.length || !(/^[a-zA-Z]+$/.test(userInput))) { // Se "userInput" è più o meno lunga di "secret" o contiene caratteri non alfabetici...
            
            prompt = "Input non valido! Riprova: "; // ...messaggio di errore e salto subito alla chiamata ricorsiva (senza decrementare il numero di tentativi rimasti).
            
        } else { // ...altrimenti...
            
            let test = check(userInput.toUpperCase(), secret.toUpperCase());
            
            console.log(test.output);
            
            if (test.guessed) {
                    
                console.log("Bravo, hai indovinato!");
                    
                attempts = 0; // Imposta "attempts" a ultimo tentativo.
                
            } else {
                
                if (attempts > 1) {
                    
                    //console.log("Sbagliato, riprova.");
                    prompt = "Sbagliato, riprova: "; // Cambio il prompt iniziale.
                    
                } else {
                    
                    console.log("Hai esaurito i tentativi. Riprova un'altra volta.");
                    
                }
                
            }
            
            attempts--; // Decremento i tentativi rimasti.
            
        }
        
        game(attempts, prompt); // Ricorsione.
                
    });
    
}

game(maxAttempts);
