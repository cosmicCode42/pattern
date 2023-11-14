
// A simple pattern game. Currently planning 4 buttons pressed in order on the screen.
// Idea: make patterns flash increasingly more quickly as time goes on [to a maximum speed]. Start at 400 ms; end at 100 ms?
// Idea: increase pattern length as time goes on. Start at 3; end at 8?
// Idea: reset pattern length with each increase in speed. <= This will be a separate mode.

let gameStuff = {
    //Need to store the buttons, a turn counter, a pattern counter, current game moves, player's moves, and each button that can be pressed
    //patternCount starts at 3 because that's the default starting pattern length.
    score: 0,
    buttons: ['button1', 'button2', 'button3', 'button4'],
    currentGame: [],
    playerInput: [],
    patternCount: 3,
    turnTime: 400,
    turnCount: 0,
    lastButton: "",
    turnInProgress: false,
};

const newGame = () => {
    /* When a new game is started, we want to:
        - hide the Start Game button (DONE)
        - begin a random pattern
        - begin with a speed of 400? ms

        - reset score (DONE)
        - reset playerInput (DONE)
        - reset currentGame (DONE)
    */

    // resets the score, time interval, turn count, playerInput and currentGame
    gameStuff.score = 0;
    gameStuff.turnTime = 400;
    gameStuff.turnCount = 0;
    gameStuff.playerInput = [];
    gameStuff.currentGame = [];

    // hide the Start Game button after clicking it
    $("#start").hide('medium');

    // begins a random pattern
    for (let n = 0; n < gameStuff.patternCount; n++) {
        let patternBit = Math.floor(Math.random() * gameStuff.buttons.length);
        gameStuff.currentGame.push(gameStuff.buttons[patternBit]);
    };

    console.log(gameStuff.currentGame);
};

const lightUp = node => {
    // causes buttons to light up during play
    document.getElementById(node).classList.add("light");
    setTimeout(() => {
        document.getElementById(node).classList.remove("light");
    }, gameStuff.turnTime); // removes light up after interval set in turnTime
};

// While testing, we'll add a way of showing the Start Game button again. We'll use the main header.
$("h1").on("click", function() {
    $("#start").show('medium');
})

module.exports = { gameStuff, newGame }; // testing, testing...