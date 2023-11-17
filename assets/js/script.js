const listOfNodes = Array.from(document.querySelectorAll('.node'));

/**
 * The game's settings.
 */
const gameConfig = {
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

/**
 * Resets the game state; score, time interval (for flashes and between flashes), turn count,
 * pattern length, playerInput and current pattern
 */
const gameReset = () => {
    gameConfig.score = 0;
    gameConfig.lightTime = 400;
    gameConfig.turnTime = 800;
    gameConfig.turnCount = 0;
    gameConfig.patternCount = 3;
    gameConfig.playerInput = [];
    gameConfig.currentPat = [];
};

const newGame = () => {

    gameReset();

    // we want to hide the Start Game button after clicking it. That code will go here.

    // start the game. This entire part was copied from the Simon game codealong challenge () and edited for my purposes.
    for (let node of listOfNodes) {
        if (node.getAttribute("data-listener") !== "true") {
            node.addEventListener("click", (e) => {
                if (gameConfig.currentPat.length > 0 && !gameConfig.turnInProgress) {
                //makes sure a game has started and the computer's turn is not in progress
                    let move = e.target.getAttribute("id");
                    gameConfig.lastButton = move;
                    clickNode(move);
                    gameConfig.playerInput.push(move);
                    playerTurn();
                };
            });
            node.setAttribute("data-listener", "true");
        };
    };
    nextTurn();
};

/**
 * Resets player's moves and current pattern and shows a new, random pattern
 */
const nextTurn = () => {

    gameConfig.playerInput = [];
    gameConfig.currentPat = [];

    for (let n = 0; n < gameConfig.patternCount; n++) {
        let patternBit = Math.floor(Math.random() * gameConfig.buttons.length);
        gameConfig.currentPat.push(gameConfig.buttons[patternBit]);
    };

    showTurn();
};

/**
 * Causes buttons to light up during play.
 * @param node ID of the button lighting up.
 */
const lightUp = node => {
    document.getElementById(node).classList.add("light", "clicked");
    setTimeout(() => {
        document.getElementById(node).classList.remove("light", "clicked");
    }, gameConfig.lightTime);
};

/**
 * Shows the current pattern on the computer's turn
 */
const showTurn = () => {
    gameConfig.turnInProgress = true;
    let seqPlace = 0;
    let sequence = setInterval(() => {
        lightUp(gameConfig.currentPat[seqPlace]);
        seqPlace++;
        if (seqPlace >= gameConfig.currentPat.length) {
            clearInterval(sequence);
            gameConfig.turnInProgress = false;
        };
    }, gameConfig.turnTime);
};

/**
 * Has each button react to being clicked.
 * @param node The ID of the button being clicked.
 */
const clickNode = node => {
    document.getElementById(node).classList.add("light", "clicked");
    setTimeout(() => {
        document.getElementById(node).classList.remove("light", "clicked");
    }, 150);
};

/**
 * Increase the pattern length every 4 patterns, to a maximum of 8.
 */
const lengthUp = () => {
    if (gameConfig.turnCount % 4 === 0 && gameConfig.patternCount < 8) {
        gameConfig.patternCount++;
    };
};

/**
 * Reduces the time of flashes and time between flashes every 7 patterns.
 */
const speedUp = () => {
    if (gameConfig.turnCount % 7 === 0) {
        if (gameConfig.lightTime > 100) {
            gameConfig.lightTime = gameConfig.lightTime - 50;
        };
        if (gameConfig.turnTime > 200) {
            gameConfig.turnTime = gameConfig.turnTime - 100;
        };
    };
};

// the base code of playerTurn() was copied from the Simon codealong challenge () and edited for my purposes.

/**
 * Checks player's input against the current pattern, continue (incrementing
 * turn counter) on success, and abort (restart) on failure.
 */
const playerTurn = () => {

    let i =  gameConfig.playerInput.length - 1;
    if (gameConfig.currentPat[i] === gameConfig.playerInput[i] ){
        if (gameConfig.currentPat.length === gameConfig.playerInput.length) {
            gameConfig.turnCount++;
            lengthUp();
            speedUp();
            nextTurn();
        };
    } else {
        alert("BZZT. From the top.");
        gameReset();
        // we want code to resummon the start button.
    };
};

module.exports = {
    gameConfig,
    gameReset,
    newGame,
    nextTurn,
    showTurn,
    lengthUp,
    speedUp,
    playerTurn
}; // testing, testing...