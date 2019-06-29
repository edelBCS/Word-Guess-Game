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

// Picks a mystery word from the array
var mysteryWord = words[Math.floor(Math.random() * words.length)];
console.log(mysteryWord);

// Get the 'mysteryWord' element and hides the word
var invisibleWord = document.getElementById("mysteryWord");
var hiddenWord = hideWord(mysteryWord);
//Displays the word as blanks spaces
invisibleWord.textContent = hiddenWord;

//when key is pressed
document.onkeyup = function(e){
    var userGuess = e.key;
    var usedLetters = document.getElementById("usedLetters");

    //if correct guess display else add to used letters pile
    (mysteryWord.indexOf(e.key) >= 0) ? (hiddenWord = unhideLetter(hiddenWord, e.key)) : (usedLetters.textContent = usedLetters.textContent + e.key + " ");
    //displays new mystery word with correct guess
    invisibleWord.textContent = hiddenWord;

    
    result = checkWin(hiddenWord);
    console.log("did you win: " + result);
    (result === true)?(alert("YOU WIN!")) : "";
    return;
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
