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
    "infection",
    "rotting",
    "flesh",
    "virus",
    "outbrake",
    "bite",
    "resurrect",
    "dead"
]

//You haven't won yet
var result = false;
var guesses = 0;
var mysteryWord;
var invisibleWord;
var hiddenWord;
var wins = 0;
var losses = 0;
var gameOver = true;

//Set WINS/LOSSES
$("#wins").text(0);
$("#losses").text(0);

setupNewGame();

//when key is pressed
document.onkeyup = function(e){
    var userGuess = e.key;
    var usedLetters = document.getElementById("usedLetters");
    
    // Checks to see if game is still live
    if (!gameOver) {
        // determins if keyup event was a letter
        if (e.which >= 65 && e.which <=90){
            //if correct guess display on screen then add letter to user letters
            if (mysteryWord.indexOf(e.key) >= 0 && (usedLetters.textContent.indexOf(e.key.toLowerCase()) < 0)) {
                hiddenWord = unhideLetter(hiddenWord, e.key);
                usedLetters.textContent = usedLetters.textContent + e.key;
                //displays new mystery word with correct guesses
                invisibleWord.text(hiddenWord);
            } else if (usedLetters.textContent.indexOf(e.key.toLowerCase()) < 0){
                usedLetters.textContent = usedLetters.textContent + e.key;
                //decrement guesses if wrong
                guesses = guesses - 1;            
                updateGuesses();
            }
            
            //check for win condition
            result = checkWin(hiddenWord);
            //Timeout is set to prevent alert from firing before page is repainted
            (result === true)?(setTimeout(function(){alert("YOU WIN!");},10)) : "";

            //check for lose condition
            result = checkLose(guesses);
            (result === true)?(setTimeout(function(){alert("YOU LOSE!");},10)) : "";

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

    // Hides the work then displays it
    hiddenWord = hideWord(mysteryWord);

    //Displays the word as blanks spaces
    invisibleWord = $("#mysteryWord");
    invisibleWord.text(hiddenWord);

    //set the number of guesses
    guesses = mysteryWord.length + 2;
    updateGuesses();

    //clears guessed letters
    $("#usedLetters").text("");
    
    //resets mysteryWord color
    $("#mysteryWord").css("color", "black");

    //set game flag to start game
    gameOver = false;
    
}

//updates the remaining guesses
function updateGuesses(){
    $("#guesses").text(guesses);
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
        $("#wins").text(wins);
        document.getElementById("mysteryWord").style = "color: white!important";
        gameOver = true;
    }
    return result;
}

//checks to see if user lost
function checkLose(g){
    var result = (g === 0)?true:false;
    if(result === true) {
        ++losses;
        $("#losses").text(losses);
        $("#mysteryWord").text(mysteryWord);
        document.getElementById("mysteryWord").style = "color: red!important";
        gameOver = true;
    }
    return result;
}
