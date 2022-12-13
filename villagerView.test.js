/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const villagerView = require("./villagerView");
const villagerApi = require("./apiVillagers");

require("jest-fetch-mock").enableMocks();

describe("Page view", () => {
  beforeEach(() => {
    fetch.resetMocks();
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("loads villager data from the api and appends paragraphs with names to the page", async () => {
   
    const mockApi = {
      getVillagers: () => {
        return [{ name: 'Cyrano' }];
      },
    };
    const view = new villagerView(mockApi);
    
    await view.displayVillagerNamesFromApi();

    expect(document.querySelectorAll("p").length).toBe(1);
  });
});
