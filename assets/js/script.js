const listOfNodes = Array.from(document.querySelectorAll('.node'));

/**
 * The game's settings.
 */
const gameConfig = {
    score: 0,
    buttons: ['button-red', 'button-yellow', 'button-green', 'button-blue'],
    currentPat: [],
    playerInput: [],
    patternCount: 3,
    lightTime: 400,
    turnTime: 800,
    turnCount: 1,
    lastButton: "",
    turnInProgress: false,
};

/**
 * Resets the game state.
 */
const gameReset = () => {
    gameConfig.score = 0;
    gameConfig.lightTime = 400;
    gameConfig.turnTime = 800;
    gameConfig.turnCount = 1;
    gameConfig.patternCount = 3;
    gameConfig.playerInput = [];
    gameConfig.currentPat = [];
};

/**
 * Starts a new game.
 */
const newGame = () => {

    gameReset();

    document.querySelector('#start').classList.add("hide");

    /* start the game. This entire loop was copied from the Simon game codealong challenge 
    (https://github.com/Code-Institute-Solutions/Jest_Testing_Part2/blob/main/09_Final_Codealong_2/scripts/game.js) 
    and edited for my purposes. */
    for (const node of listOfNodes) {
        if (node.getAttribute("data-listener") !== "true") {
            node.addEventListener("click", (e) => {
                if (gameConfig.currentPat.length > 0 && !gameConfig.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    gameConfig.lastButton = move;
                    clickNode(move);
                    gameConfig.playerInput.push(move);
                    playerTurn();
                }
            });
            node.setAttribute("data-listener", "true");
        }
    }
    nextTurn();
};

/**
 * Resets player's moves and current pattern and shows a new, random pattern
 */
const nextTurn = () => {

    gameConfig.playerInput = [];
    gameConfig.currentPat = [];

    for (let patternCount = 0; patternCount < gameConfig.patternCount; patternCount++) {
        let patternBit = Math.floor(Math.random() * gameConfig.buttons.length);
        gameConfig.currentPat.push(gameConfig.buttons[patternBit]);
    }

    showTurn();
};

/**
 * Has each button react to being clicked. Also causes buttons to light up during play.
 * @param node The ID of the button being clicked.
 * @param time Time in milliseconds to wait.
 */
const clickNode = (node, time = 150) => {
    document.querySelector(`#${node}`).classList.add("light", "clicked");
    setTimeout(() => {
        document.querySelector(`#${node}`).classList.remove("light", "clicked");
    }, time);
};

/**
 * Shows the current pattern on the computer's turn
 */
const showTurn = () => {
    gameConfig.turnInProgress = true;
    let seqPlace = 0;
    let sequence = setInterval(() => {
        clickNode(gameConfig.currentPat[seqPlace], gameConfig.lightTime);
        seqPlace++;
        if (seqPlace >= gameConfig.currentPat.length) {
            clearInterval(sequence);
            gameConfig.turnInProgress = false;
        }
    }, gameConfig.turnTime);
};

/**
 * Increase the pattern length every 4th pattern, to a maximum of 8.
 */
const lengthUp = () => {
    if (gameConfig.turnCount % 4 === 0 && gameConfig.patternCount < 8) {
        gameConfig.patternCount++;
    }
};

/**
 * Reduces the time of flashes and time between flashes every 7th pattern.
 */
const speedUp = () => {
    if (gameConfig.turnCount % 7 === 0) {
        if (gameConfig.lightTime > 100) {
            gameConfig.lightTime = gameConfig.lightTime - 50;
        }
        if (gameConfig.turnTime > 200) {
            gameConfig.turnTime = gameConfig.turnTime - 100;
        }
    }
};

/* the base structure of playerTurn() was copied from the Simon game codealong challenge 
    (https://github.com/Code-Institute-Solutions/Jest_Testing_Part2/blob/main/09_Final_Codealong_2/scripts/game.js) 
    and edited for my purposes. */

/**
 * Checks player's input against the current pattern, continue (incrementing
 * turn counter) on success, and abort (restart) on failure. Also changes
 * high score and display of max pattern length reached.
 */
const playerTurn = () => {

    let i =  gameConfig.playerInput.length - 1;
    if (gameConfig.currentPat[i] === gameConfig.playerInput[i] ){
        if (gameConfig.currentPat.length === gameConfig.playerInput.length) {
            gameConfig.turnCount++;
            gameConfig.score++;
            lengthUp();
            speedUp();
            nextTurn();
        }
    } else {
        alert("BZZT. From the top.");
        
        if (document.querySelector('#highscore').innerHTML < gameConfig.score) {
            localStorage.setItem("highScore", gameConfig.score);
            document.querySelector('#highscore').innerHTML = localStorage.highScore;
        }
        if (document.querySelector('#maxlength').innerHTML < gameConfig.patternCount) {
            localStorage.setItem("maxLength", gameConfig.patternCount);
            document.querySelector('#maxlength').innerHTML = localStorage.maxLength;
        }
        gameReset();
        document.querySelector('#start').classList.remove("hide");
    }
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
};