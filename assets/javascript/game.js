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

// Picks a mystery word from the array
var mysteryWord = words[Math.floor(Math.random() * words.length)];
console.log(mysteryWord);

// Get the 'mysteryWord' element and hides the word
var invisibleWord = document.getElementById("mysteryWord");
var hiddenWord = hideWord(mysteryWord);

//Displays the word as blanks spaces
invisibleWord.textContent = hiddenWord;

//set the number of guesses the player has left
guesses = mysteryWord.length + 2;
updateGuesses();

//when key is pressed
document.onkeyup = function(e){
    var userGuess = e.key;
    var usedLetters = document.getElementById("usedLetters");

    //if correct guess display else add to used letters pile
    console.log(usedLetters.textContent.indexOf(e.key.toLowerCase()));
    if (mysteryWord.indexOf(e.key) >= 0 && (usedLetters.textContent.indexOf(e.key.toLowerCase()) < 0)) {
        hiddenWord = unhideLetter(hiddenWord, e.key);
        usedLetters.textContent = usedLetters.textContent + e.key;
    } else if (usedLetters.textContent.indexOf(e.key.toLowerCase()) < 0){
        usedLetters.textContent = usedLetters.textContent + e.key;
    }
    //displays new mystery word with correct guess
    invisibleWord.textContent = hiddenWord;
    guesses = guesses - 1;
    
    updateGuesses();
    
    result = checkWin(hiddenWord);
    (result === true)?(alert("YOU WIN!")) : "";

    result = checkLose(guesses);
    (result === true)?(alert("YOU LOSE!")) : "";
    return;
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
        console.log(hiddenWord, tempStr);
    }
    
    console.log(hiddenWord);
    return  hiddenWord;
}

//checks to see if user won
function checkWin(hiddenWord){
    var result = (hiddenWord.indexOf("_") >= 0) ? false : true;
    
    return result;
}

function checkLose(g){
    var result = (g === 0)?true:false;
    return result;
}
