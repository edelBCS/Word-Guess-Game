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

// Picks a mystery word from the array
var mysteryWord = words[Math.floor(Math.random() * words.length)];
console.log(mysteryWord);

// Get the 'mysteryWord' element and hides the word
var invisibleWord = document.getElementById("mysteryWord");
var hiddenWord = hideWord(mysteryWord);
invisibleWord.textContent = hiddenWord;

document.onkeyup = function(e){
    var userGuess = e.key;
    var usedLetters = document.getElementById("usedLetters");
    (mysteryWord.indexOf(e.key) >= 0) ? (invisibleWord.textContent = unhideLetter(hiddenWord, e.key)) : (usedLetters.textContent = usedLetters.textContent + e.key + " ");

}

function hideWord(word){
    var hiddenWord = "";
    for(var letters of word){hiddenWord = hiddenWord + "_"}
    return hiddenWord;
}

function unhideLetter(hiddenWord, letter){
    
    for(var i = 0; i<mysteryWord.length; ++i){
        var tempStr = (mysteryWord[i] === letter) ? hiddenWord.substring(0, i) + letter + hiddenWord.substring(i + 1) : hiddenWord;
        hiddenWord = tempStr;
        console.log(hiddenWord, tempStr);
    }
    return  hiddenWord;
}
