/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const villagerView = require("./villagerView");
const villagerApi = require("./apiACNH");

require("jest-fetch-mock").enableMocks();

describe("Page view", () => {
  beforeEach(() => {
    fetch.resetMocks();
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("loads villager data from the api and appends paragraphs with names to the page", async () => {

    const mockApi = {
      getVillagers: jest.fn().mockResolvedValue([
        {
          name: {
            "name-USen": "Cyrano"
          }
        }
      ])
    };

    const view = new villagerView(mockApi);

    await view.displayVillagerNamesFromApi();

    const villagerEl = document.querySelectorAll("p.villager");
    console.log(villagerEl[0], "villagerEl[0]")

    expect(villagerEl.length).toBe(1);
    console.log((villagerEl[0]).textContent, "text content");
    expect(villagerEl[0].textContent).toBe('Cyrano')
  });
});
