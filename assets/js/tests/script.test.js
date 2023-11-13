/**
 * @jest-environment jsdom
 */

jest.spyOn(window, "alert").mockImplementation(() => {})

const { gameStuff, newGame } = require("../script")

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
    test("currentGame key exists", () => {
        expect("currentGame" in gameStuff).toBe(true);
    });
    test("playerInput key exists", () => {
        expect("playerInput" in gameStuff).toBe(true);
    });
    test("patternCount key exists", () => {
        expect("patternCount" in gameStuff).toBe(true);
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