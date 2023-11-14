/**
 * @jest-environment jsdom
 */

jest.spyOn(window, "alert").mockImplementation(() => {})

const { gameStuff, newGame, showTurn, playerTurn } = require("../script")

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("gameStuff object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in gameStuff).toBe(true);
    });
    test("buttons key exists", () => {
        expect("buttons" in gameStuff).toBe(true);
    });
    test("currentPat key exists", () => {
        expect("currentPat" in gameStuff).toBe(true);
    });
    test("playerInput key exists", () => {
        expect("playerInput" in gameStuff).toBe(true);
    });
    test("patternCount key exists", () => {
        expect("patternCount" in gameStuff).toBe(true);
    });
    test("lightTime key exists", () => {
        expect("lightTime" in gameStuff).toBe(true);
    });
    test("turnTime key exists", () => {
        expect("turnTime" in gameStuff).toBe(true);
    });
    test("turnCount key exists", () => {
        expect("turnCount" in gameStuff).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in gameStuff).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in gameStuff).toBe(true);
    });
});

describe("newGame is functioning properly", () => {
    beforeAll(() => {
        gameStuff.score = 25;
        gameStuff.currentPat = [4, 6, 1, 7, 2];
        gameStuff.playerInput = [1, 5, 2, 5, 4];
        gameStuff.lightTime = 100;
        gameStuff.turnTime = 300;
        newGame();
    });
    test("score should be reset", () => {
        expect(gameStuff.score).toEqual(0);
    });
    test("playerInput should be reset", () => {
        expect(gameStuff.playerInput.length).toEqual(0);
    });
    test("starting pattern [currentPat] should have a length of 3", () => {
        expect(gameStuff.currentPat.length).toEqual(3);
    });
    test("time of flashes should be reset", () => {
        expect(gameStuff.lightTime).toEqual(400);
    });
    test("time between flashes should be reset", () => {
        expect(gameStuff.turnTime).toEqual(800);
    });
});

// describe("gameplay is functioning properly", () => {
//     x
// })