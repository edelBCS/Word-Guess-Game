//You haven't won yet

var wins = 0;
var losses = 0;

var zombieWord = {
    result : false,
    guesses : 0,
    mysteryWord : "",
    invisibleWord : "",
    hiddenWord : "",
    gameOver : true,
    words : [
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
    ],
    // Sets perameters for a New Game
    setupNewGame : function(){
        // Picks a mystery word from the array
        this.mysteryWord = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(this.mysteryWord);

        // Hides the work then displays it
        this.hiddenWord = this.hideWord(this.mysteryWord);

        //Displays the word as blanks spaces
        this.invisibleWord = $("#mysteryWord");
        this.invisibleWord.text(this.hiddenWord);

        //set the number of guesses
        this.guesses = this.mysteryWord.length + 2;
        this.updateGuesses();

        //clears guessed letters
        $("#usedLetters").text("");
        
        //resets mysteryWord color
        $("#mysteryWord").css("color", "black");

        //restarts the game
        this.gameOver = false;
        
    },

    //updates the remaining guesses
    updateGuesses : function(){
        $("#guesses").text(this.guesses);
    },

    //masks the word as underscores
    hideWord : function(word){
        var tempHiddenWord = "";
        for(var letters of word){tempHiddenWord = tempHiddenWord + "_"}
        return tempHiddenWord;
    },

    //checks if letter is in word, reveals it if correct
    unhideLetter : function(temphiddenWord, letter){    
        for(var i = 0; i<this.mysteryWord.length; ++i){
            var tempStr = (this.mysteryWord[i] === letter) ? temphiddenWord.substring(0, i) + letter + temphiddenWord.substring(i + 1) : temphiddenWord;
            temphiddenWord = tempStr;
        }        
        return  tempStr;
    },

    //checks to see if user won
    checkWin : function(temphiddenWord){
        var result = (temphiddenWord.indexOf("_") >= 0) ? false : true;
        if (result === true){
            ++wins;    
            $("#wins").text(wins);
            document.getElementById("mysteryWord").style = "color: white!important";
            this.gameOver = true;
        }
        return result;
    },

    //checks to see if user lost
    checkLose : function(g){
        var result = (g === 0)?true:false;
        if(result === true) {
            ++losses;
            $("#losses").text(losses);
            $("#mysteryWord").text(this.mysteryWord);
            document.getElementById("mysteryWord").style = "color: red!important";
            this.gameOver = true;
            $("#lossAudio").get(0).play();
        }        
        return result;
    }
}

//Set WINS/LOSSES
$("#wins").text(0);
$("#losses").text(0);

zombieWord.setupNewGame();

//when key is pressed
document.onkeyup = function(e){
    var userGuess = e.key;
    var usedLetters = document.getElementById("usedLetters");
    
    // Checks to see if game is still live
    if (!zombieWord.gameOver) {
        // determins if keyup event was a letter
        if (e.which >= 65 && e.which <=90){
            //if correct guess display on screen then add letter to user letters
            if (zombieWord.mysteryWord.indexOf(e.key) >= 0 && (usedLetters.textContent.indexOf(e.key.toLowerCase()) < 0)) {
                zombieWord.hiddenWord = zombieWord.unhideLetter(zombieWord.hiddenWord, e.key);
                usedLetters.textContent = usedLetters.textContent + e.key;
                //displays new mystery word with correct guesses
                zombieWord.invisibleWord.text(zombieWord.hiddenWord);
            } else if (usedLetters.textContent.indexOf(e.key.toLowerCase()) < 0){
                usedLetters.textContent = usedLetters.textContent + e.key;
                //decrement guesses if wrong
                zombieWord.guesses = zombieWord.guesses - 1;            
                zombieWord.updateGuesses();
            }
            
            //check for win condition
            zombieWord.result = zombieWord.checkWin(zombieWord.hiddenWord);
            //Timeout is set to prevent alert from firing before page is repainted
            (zombieWord.result === true)?(setTimeout(function(){alert("YOU WIN!");},10)) : "";

            //check for lose condition
            zombieWord.result = zombieWord.checkLose(zombieWord.guesses);
            (zombieWord.result === true)?(setTimeout(function(){alert("YOU LOSE!");},10)) : "";

        } else {
            alert("Please Choose a Letter");
        }
    }
}






