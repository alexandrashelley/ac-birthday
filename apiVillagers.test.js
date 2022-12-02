const apiVillagers = require("./apiVillagers");

require("jest-fetch-mock").enableMocks();

describe("the API class", () => {
  it("calls fetch and loads data", () => {
    const api = new apiVillagers();

    fetch.mockResponseOnce(
      JSON.stringify({
        name: "Cyrano",
      })
    );

    api.getVillagers((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toEqual("Cyrano");
    });
  });
});
