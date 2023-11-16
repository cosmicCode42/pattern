// A simple pattern game. Currently planning 4 buttons pressed in order on the screen.
// Idea: make patterns flash increasingly more quickly as time goes on [to a maximum speed]. Start at 400 ms; end at 100 ms?
// Idea: increase pattern length as time goes on. Start at 3; end at 8?
// Idea: every 4 patterns, increase pattern length by 1.
// Idea: every 7 patterns, increase speed of flashes (-50ms lightTime, -100ms turnTime).
// Idea: reset pattern length with each increase in speed. <= This will be a separate mode.

let gameStuff = {
    //Need to store the buttons, a turn counter, a pattern counter, current game moves, player's moves, and each button that can be pressed
    //patternCount starts at 3 because that's the default starting pattern length.
    score: 0,
    buttons: ['button1', 'button2', 'button3', 'button4'],
    currentPat: [],
    playerInput: [],
    patternCount: 3,
    lightTime: 400,
    turnTime: 800,
    turnCount: 0,
    lastButton: "",
    turnInProgress: false,
};

const gameReset = () => {
    /* resets the score, time interval (for flashes and between flashes), turn count,
     pattern length, playerInput and current pattern */
    gameStuff.score = 0;
    gameStuff.lightTime = 400;
    gameStuff.turnTime = 800;
    gameStuff.turnCount = 0;
    gameStuff.patternCount = 3;
    gameStuff.playerInput = [];
    gameStuff.currentPat = [];
};

const newGame = () => {
    /* When a new game is started, we want to:
        - reset all variables (DONE with the gameReset function)
        - hide the Start Game button (DONE)
        - begin a random pattern (DONE)
        - begin with a speed of 400 ms flashes with 800 ms intervals (DONE)
    */

    gameReset(); // this resets the game state.

    // hide the Start Game button after clicking it
    $("#start").hide('medium');

    // start the game. This entire part was copied from the Simon game codealong challenge () and edited for my purposes.
    for (let node of document.getElementsByClassName("node")) {
        if (node.getAttribute("data-listener") !== "true") {
            node.addEventListener("click", (e) => {
                if (gameStuff.currentPat.length > 0) {
                // && !game.turnInProgress) { makes sure a game has started and the computer's turn is not in progress
                    let move = e.target.getAttribute("id"); // your player's move; each click is 1
                    gameStuff.lastButton = move;
                    clickNode(move);
                    gameStuff.playerInput.push(move);
                    playerTurn();
                };
            });
            node.setAttribute("data-listener", "true");
        };
    };
    nextTurn();
};

const nextTurn = () => {
    // resets player's moves and current pattern and shows a new, random pattern

    // reset player's moves and current pattern
    gameStuff.playerInput = [];
    gameStuff.currentPat = [];

    //generates random pattern
    for (let n = 0; n < gameStuff.patternCount; n++) {
        let patternBit = Math.floor(Math.random() * gameStuff.buttons.length);
        gameStuff.currentPat.push(gameStuff.buttons[patternBit]);
    };

    showTurn(); // this shows the pattern to the player
};

const lightUp = node => {
    // causes buttons to light up during play
    document.getElementById(node).classList.add("light", "clicked");
    setTimeout(() => {
        document.getElementById(node).classList.remove("light", "clicked");
    }, gameStuff.lightTime); // removes light up after interval set in turnTime
};

const showTurn = () => {
    // this shows the current pattern on the computer's turn
    let seqPlace = 0;
    let sequence = setInterval(() => {
        lightUp(gameStuff.currentPat[seqPlace]);
        seqPlace++;
        if (seqPlace >= gameStuff.currentPat.length) {
            clearInterval(sequence);
        };
    }, gameStuff.turnTime);
};

const clickNode = node => {
    // this has each button react to being clicked
    document.getElementById(node).classList.add("light", "clicked");
    setTimeout(() => {
        document.getElementById(node).classList.remove("light", "clicked");
    }, 100);
};

const lengthUp = () => {
    // this SHOULD increase the length every 4 patterns, to a maximum of 8.
    if (gameStuff.turnCount % 4 === 0 && gameStuff.patternCount < 8) {
        gameStuff.patternCount++;
    };
};

const speedUp = () => {
    // this SHOULD reduce the time between flashes every 7 patterns.
    if (gameStuff.turnCount % 7 === 0) {
        // First we reduce the flash time, to a minimum time.
        if (gameStuff.lightTime > 100) {
            gameStuff.lightTime = gameStuff.lightTime - 50;
        };
        // Then we reduce the time between flashes, to a minimum time.
        if (gameStuff.turnTime > 200) {
            gameStuff.turnTime = gameStuff.turnTime - 100;
        };
    };
};

// the base code was copied from the Simon codealong challenge () and edited for my purposes.
const playerTurn = () => {
    // needs to check player's input against the current pattern, continue on success and abort on failure
    // also calls lengthUp and speedUp, so it needs to increment the turn counter each time the player is correct.

    // get last move from playerInput
    let i =  gameStuff.playerInput.length - 1;
    /* if the playerInput gets to the end of the sequence, the player has succeeded. We need to:
     - increment the turn count
     - check if enough turns have passed for the pattern length to increase; increase length if so
     - check if enough turns have passed for the speed to increase; increase speed (reduce intervals) if so
     - add the next turn */
    if (gameStuff.currentPat[i] === gameStuff.playerInput[i] ){
        if (gameStuff.currentPat.length === gameStuff.playerInput.length) {
            gameStuff.turnCount++;
            lengthUp();
            speedUp();
            nextTurn();
        };
    } else { 
        // if the player does not get to the end of the sequence, pull up an alert and reset the game state
        alert("BZZT. From the top.");
        gameReset();
        $("#start").show('medium'); // <= this will resummon the button.
    };
};

module.exports = {
    gameStuff,
    gameReset,
    newGame,
    nextTurn,
    showTurn,
    lengthUp,
    speedUp,
    playerTurn
}; // testing, testing...