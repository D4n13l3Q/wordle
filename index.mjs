import readline from "readline";

import chalk from "chalk";



const secret = "rebus";




// Funzioni

const countOccurrences = (str) => str.split("").reduce( function(elements, character) {
    elements[character] ? elements[character]++ : elements[character] = 1;
    return elements;
}, {});



const removeFirstOccurence = function(myarray) {
    let index = array.indexOf(item);
    if (index >= 0) array.splice(index, 1);    
}


/*
const check = function(input, secret) {
    
    secret = secret.split("");
    
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
        
        secret[i] = "*";
                
    }
    
    return {
        output : output.join("-"),
        guessed : guessed
    };
    
}
*/





const check = function(input, secret) {
    
    input = input.toUpperCase().split("");   // Converto "input"...
    secret = secret.toUpperCase().split(""); // ...e "secret" in tutto maiuscolo e li divido in array di caratteri (in realtà array di stringhe da un carattere).
    
    let guessed = true;
    
    let output = input.map( function (inputChar, inputCharIndex) {
        
        let secretCharIndex = secret.indexOf(inputChar);
        
        if (secretCharIndex < 0) { // Se "inputChar" non è presente in "secret"...
            
            inputChar = chalk.grey(inputChar); // ...coloro "inputChar" di grigio (non è più un singolo carattere ma non mi interessa).
            guessed = false;
            
        } else { // ...altrimenti se è presente in "secret"...
            
            if (inputCharIndex === secretCharIndex) // ...se gli index sono uguali (sono nella stessa posizione)...
                inputChar = chalk.green(inputChar); // ...coloro "inputChar" di verde...
            else { // ...alrimenti...
                inputChar = chalk.yellow(inputChar); // ...color "inputChar" di giallo...
                guessed = false;
            }
            
            secret[secretCharIndex] = "*"; // ...inoltre cambio la lettera trovata ad un asterisco per non controllarla di nuovo.
            
        }
        
        return inputChar;
        
    } );
    
    return {
        output : output.join(""),
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
