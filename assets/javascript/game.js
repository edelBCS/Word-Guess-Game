const words = [
    "zombie",
    "walkers",
    "brains",
    "undead",
    "unearth",
    "graves",
    "headshot",
    "doubletap",
    "cardio",
    "limberup",
    "cannibalize",
    "corpse",
    "apocalypse",
    "reanimate",
    "infection"
]

//You haven't won yet
var result = false;
var guesses = 0;
var mysteryWord;
var invisibleWord;
var hiddenWord;
var wins = 0;
var losses = 0;

setupNewGame();

//when key is pressed
document.onkeyup = function(e){
    var userGuess = e.key;
    var usedLetters = document.getElementById("usedLetters").textContent;

    // Checks to see if game is still live
    if (guesses > 0) {
        // determins if keyup event was a letter
        if (e.which >= 65 && e.which <=90){
            //if correct guess display on screen then add letter to user letters
            if (mysteryWord.indexOf(e.key) >= 0 && (usedLetters.indexOf(e.key.toLowerCase()) < 0)) {
                hiddenWord = unhideLetter(hiddenWord, e.key);
                usedLetters = usedLetters + e.key;
            } else if (usedLetters.indexOf(e.key.toLowerCase()) < 0){
                usedLetters = usedLetters + e.key;
            }

            //displays new mystery word with correct guess
            invisibleWord.textContent = hiddenWord;

            //decrement guesses
            guesses = guesses - 1;            
            updateGuesses();
            
            //check for win condition
            result = checkWin(hiddenWord);
            (result === true)?(alert("YOU WIN!")) : "";

            //check for lose condition
            result = checkLose(guesses);
            (result === true)?(alert("YOU LOSE!")) : "";

        } else {
            alert("Please Choose a Letter");
        }
    }
}

// Sets perameters for a New Game
function setupNewGame(){
    // Picks a mystery word from the array
    mysteryWord = words[Math.floor(Math.random() * words.length)];
    console.log(mysteryWord);

    // Get the 'mysteryWord' element and hides the word
    invisibleWord = document.getElementById("mysteryWord");
    hiddenWord = hideWord(mysteryWord);

    //Displays the word as blanks spaces
    invisibleWord.textContent = hiddenWord;

    //set the number of guesses the player has left
    guesses = mysteryWord.length + 2;
    updateGuesses();
}

//updates the remaining guesses
function updateGuesses(){
    var guessesID = document.getElementById("guesses");
    guessesID.textContent =  "Remaining Guesses: "+ (guesses);
}

//masks the word as underscores
function hideWord(word){
    var hiddenWord = "";
    for(var letters of word){hiddenWord = hiddenWord + "_"}
    return hiddenWord;
}

//checks if letter is in word, reveals it if correct
function unhideLetter(hiddenWord, letter){    
    for(var i = 0; i<mysteryWord.length; ++i){
        var tempStr = (mysteryWord[i] === letter) ? hiddenWord.substring(0, i) + letter + hiddenWord.substring(i + 1) : hiddenWord;
        hiddenWord = tempStr;
    }
    
    return  hiddenWord;
}

//checks to see if user won
function checkWin(hiddenWord){
    var result = (hiddenWord.indexOf("_") >= 0) ? false : true;
    if (result === true){
        ++wins;    
        document.getElementById("wins").textContent = "WINS: " + wins;
    }
    return result;
}

function checkLose(g){
    var result = (g === 0)?true:false;
    if(result === true) {
        ++losses;
        document.getElementById("losses").textContent = "LOSSES: " + losses;
    }
    return result;
}
