/**
 * @jest-environment jsdom
 */

jest.spyOn(window, "alert").mockImplementation(() => {})

const { 
    gameConfig,
    gameReset,
    newGame,
    nextTurn,
    showTurn,
    lengthUp,
    speedUp,
    playerTurn } = require("../script")

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("gameConfig object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in gameConfig).toBe(true);
    });
    test("buttons key exists", () => {
        expect("buttons" in gameConfig).toBe(true);
    });
    test("currentPat key exists", () => {
        expect("currentPat" in gameConfig).toBe(true);
    });
    test("playerInput key exists", () => {
        expect("playerInput" in gameConfig).toBe(true);
    });
    test("patternCount key exists", () => {
        expect("patternCount" in gameConfig).toBe(true);
    });
    test("lightTime key exists", () => {
        expect("lightTime" in gameConfig).toBe(true);
    });
    test("turnTime key exists", () => {
        expect("turnTime" in gameConfig).toBe(true);
    });
    test("turnCount key exists", () => {
        expect("turnCount" in gameConfig).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in gameConfig).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in gameConfig).toBe(true);
    });
});

describe("gameConfig object contains correct intial values", () => {
    test("score key initial value is correct", () => {
        expect(gameConfig.score).toBe(0);
    });
    test("buttons key array is accurate", () => {
        expect(gameConfig.buttons).toStrictEqual(['button-red', 'button-yellow', 'button-green', 'button-blue']);
    });
    test("currentPat array is empty", () => {
        expect(gameConfig.currentPat.length).toBe(0);
    });
    test("playerInput array is empty", () => {
        expect(gameConfig.playerInput.length).toBe(0);
    });
    test("patternCount initial value is correct", () => {
        expect(gameConfig.patternCount).toBe(3);
    });
    test("lightTime initial value is correct", () => {
        expect(gameConfig.lightTime).toBe(400);
    });
    test("turnTime initial value is correct", () => {
        expect(gameConfig.turnTime).toBe(800);
    });
    test("turnCount initial value is correct", () => {
        expect(gameConfig.turnCount).toBe(1);
    });
    test("lastButton is empty", () => {
        expect(gameConfig.lastButton).toBe("");
    });
    test("turnInProgress is false", () => {
        expect(gameConfig.turnInProgress).toBe(false);
    });
});

describe("newGame is functioning properly", () => {
    beforeAll(() => {
        gameConfig.score = 25;
        gameConfig.currentPat = [4, 6, 1, 7, 2];
        gameConfig.playerInput = [1, 5, 2, 5, 4];
        gameConfig.lightTime = 100;
        gameConfig.turnTime = 300;
        newGame();
    });
    test("score should be reset", () => {
        expect(gameConfig.score).toEqual(0);
    });
    test("playerInput should be reset", () => {
        expect(gameConfig.playerInput.length).toEqual(0);
    });
    test("starting pattern [currentPat] should have a length of 3", () => {
        expect(gameConfig.currentPat.length).toEqual(3);
    });
    test("time of flashes should be reset", () => {
        expect(gameConfig.lightTime).toEqual(400);
    });
    test("time between flashes should be reset", () => {
        expect(gameConfig.turnTime).toEqual(800);
    });
    test("turn counter should be reset", () => {
        expect(gameConfig.turnCount).toEqual(1);
    });
});

describe("gameplay is functioning properly", () => {
    beforeAll(() => {
        gameConfig.patternCount = 7;
        gameConfig.currentPat = [4, 6, 1, 7, 2, 3, 5];
        gameConfig.playerInput = [4, 6, 1, 7, 2, 3, 5];
        gameConfig.lightTime = 200;
        gameConfig.turnTime = 400;
        gameConfig.turnCount = 27;
        playerTurn(); 
    }); // this should check that both speedUp and lengthUp are working; 28 is a multiple of 4 and 7.
    test("turnCount should be incremented", () => {
        expect(gameConfig.turnCount).toEqual(28);
    });
    test("patternCount should be incremented", () => {
        expect(gameConfig.patternCount).toEqual(8);
    });
    test("currentPat length should be equal to patternCount", () => {
        expect(gameConfig.currentPat.length).toEqual(gameConfig.patternCount);
    });
    test("lightTime should be reduced by 50", () => {
        expect(gameConfig.lightTime).toEqual(150);
    });
    test("turnTime should be reduced by 100", () => {
        expect(gameConfig.turnTime).toEqual(300);
    });
});