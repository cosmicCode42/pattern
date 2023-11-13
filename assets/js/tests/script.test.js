/**
 * @jest-environment jsdom
 */

jest.spyOn(window, "alert").mockImplementation(() => {})

const { gameStuff } = require("../game")

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});