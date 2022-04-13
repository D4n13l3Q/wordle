import readline from "readline";

import chalk from "chalk";



const secret = "rebus";




// Funzioni

const check = function(input, secret) {
    
    let guessed = true;
    let output = [];
    
    for (let i in secret) {
        
        if (secret[i] === input[i]) {
        
            output.push(chalk.green(input[i]));
        
        } else {
         
            if (secret.includes(input[i])) {
                
                output.push(chalk.yellow(input[i]));
                
            } else {
                
                output.push(chalk.grey(input[i]));
                
            }
            
            guessed = false;
            
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
    
    if (attempts <= 0) return rl.close(); // Se i tentativi rimasti sono meno di zero (zero è l'ultimo tetnativo valido) esco chiudendo readline.
    
    rl.question(prompt, (userInput) => {
        
        if (userInput.length !== secret.length || !(/^[a-zA-Z]+$/.test(userInput))) { // Se "userInput" è più o meno lunga di "secret" o contiene caratteri non alfabetici...
            
            prompt = "Input non valido! Riprova: "; // ...messaggio di errore e salto subito alla chiamata ricorsiva (senza decrementare il numero di tentativi rimasti).
            
        } else { // ...altrimenti...
            
            let test = check(userInput.toUpperCase(), secret.toUpperCase());
            
            console.log(test.output);
            
            if (test.guessed) {
                    
                console.log("Bravo, hai indovinato!");
                    
                attempts = 0; // Impost "attempts" a ultimo tentativo.
                
            } else {
                
                if (attempts > 0) {
                    
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
