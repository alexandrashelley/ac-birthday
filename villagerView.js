const api = require("./apiVillagers");

class villagerView {
  constructor(api) {
    this.api = api;
    this.mainContainerEl = document.querySelector("#villager-data");
  }

  async displayVillagerNamesFromApi() {
    const villagerData = await this.api.getVillagers();

    villagerData.forEach((villager) => {
      const villagerNameObject = (villager.name)
      const villagerName = (villagerNameObject[`name-USen`])

      const villagerParagraph = document.createElement("p");
      villagerParagraph.className = "villager";
      villagerParagraph.textContent = villagerName;
      this.mainContainerEl.append(villagerParagraph);
    });
  }
}

module.exports = villagerView;
