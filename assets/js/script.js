
// A simple pattern game. Currently planning 4 buttons pressed in order on the screen.
// Idea: make patterns flash increasingly more quickly as time goes on [to a maximum speed].
// Idea: increase pattern length as time goes on. Start at 3; end at 8?
// Idea: reset pattern length with each increase in speed.

let gameStuff = {
    //Need to store the buttons, a turn counter, a pattern counter, current game moves, player's moves, turn number, and each button that can be pressed
    score: 0,
    buttons: ['button1', 'button2', 'button3', 'button4'],
    currentGame: [],
    playerInput: [],
    patternCount: 0,
    turnCount: 0,
    lastButton: "",
    turnInProgress: false,
};

const newGame = () => {
    console.log("This works.")
};

module.exports = { game }; // testing, testing...