const api = require("./apiVillagers");

class villagerView {
  constructor(api) {
    this.api = api;
    this.mainContainerEl = document.querySelector("#villager-data");

    console.log(this.mainContainerEl, "hello");
  }

  async displayVillagersFromApi() {
     this.api.getVillagers((villagerData) => {
      villagerData.forEach((villager) => {
        console.log(villager, "hello")
        const villagerParagraph = document.createElement("p");
        villagerParagraph.className = "villager";
        villagerParagraph.textContent = villager;
        this.mainContainerEl.append(villagerParagraph);
        console.log(villagerParagraph, "hello");
      });
    });
  }
}
module.exports = villagerView;
