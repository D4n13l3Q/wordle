import readline from "readline";

import chalk from "chalk";

import * as wordle from "./wordle-lib.mjs";





// Costanti

const maxAttempts = 6;




// Funzioni

const check = function(input, secret) {
    
    input = input.toUpperCase().split("");   // Converto "input"...
    secret = secret.toUpperCase().split(""); // ...e "secret" in tutto maiuscolo e li divido in array di caratteri (in realtà array di stringhe da un carattere).
    
    let secretOccurrences = wordle.countOccurrences(secret);
    
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







// MAIN

const dictionaryPath = process.argv[2] !== undefined ? process.argv[2] : "dictionary.txt";

const words = wordle.getWords(dictionaryPath);

const secret = words[wordle.randomInt(0, words.length)].toUpperCase();
//const secret = "CODE";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`La parola da indovinare è lunga ${secret.length} lettere.`); // Tutto il resto dovrebbe funzionare indipendentemente dalla lunghezza della parola segreta qudindi conviene farla sapere all'utente.

console.log(`Hai a disposizione ${maxAttempts} tentativi.`);

const game = function(attempts, prompt = "\nInserisci una parola: ") {
    
    if (attempts < 1) return rl.close(); // Se i tentativi rimasti sono meno di zero (zero è l'ultimo tentativo valido) esco chiudendo readline.
    
    rl.question(prompt, (userInput) => {
        
        if (userInput.length !== secret.length || !(/^[a-zA-Z]+$/.test(userInput))) { // Se "userInput" è più o meno lunga di "secret" o contiene caratteri non alfabetici...
            
            prompt = `\nInput non valido!\nHai ancora ${attempts - 1} tentativ${attempts - 1 > 1 ? "i" : "o"}.\nRiprova: `; // ...messaggio di errore e salto subito alla chiamata ricorsiva (senza decrementare il numero di tentativi rimasti).
            
        } else { // ...altrimenti...
            
            let test = check(userInput.toUpperCase(), secret);
            
            console.log(`\n${test.output}`);
            
            if (test.guessed) {
                    
                console.log("\nBravo, hai indovinato!");
                    
                attempts = 0; // Imposta "attempts" a ultimo tentativo.
                
            } else {
                
                if (attempts > 1) {
                    
                    //console.log("Sbagliato, riprova.");
                    prompt = `\nSbagliato, ma hai ancora ${attempts - 1} tentativ${attempts - 1 > 1 ? "i" : "o"}.\nRiprova: `; // Cambio il prompt iniziale.
                    
                } else {
                    
                    console.log(`\nSbagliato, la parola era "${secret}".`);
                    console.log("\nHai esaurito i tentativi, riprova un'altra volta.");
                    
                }
                
            }
            
            attempts--; // Decremento i tentativi rimasti.
            
        }
        
        game(attempts, prompt); // Ricorsione.
                
    });
    
}

game(maxAttempts);
