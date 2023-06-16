const api = require("./apiVillagers");

class villagerView {
  constructor(api) {
    this.api = api;
    this.mainContainerEl = document.querySelector("#villager-data");
    this.birthdayInput = document.querySelector("#birthday-input");
    this.submitButton = document.querySelector("#submit-birthday");

    this.submitButton.addEventListener("click", () => {
      this.birthdayDiv(this.formattedDate());
    });
  }

  birthdayDiv(birthday) {
    const birthdayDiv = document.createElement("div");
    birthdayDiv.className = "birthday";
    birthdayDiv.textContent = birthday;
    this.mainContainerEl.append(birthdayDiv);
  }

  async displayVillagerNamesFromApi() {
    const villagerData = await this.api.getVillagers();

    villagerData.forEach((villager) => {
      const villagerName = villager.name[`name-USen`];

      const villagerParagraph = document.createElement("p");
      villagerParagraph.className = "villager";
      villagerParagraph.textContent = villagerName;
      this.mainContainerEl.append(villagerParagraph);
    });
  }

  formattedDate() {
    const date = this.birthdayInput.value;
    // split date into parts (m/d/y), by hyphen
    const parts = date.split("-");
    // pull month and day parts
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const formattedBirthday = `${day}/${month}`;
    return formattedBirthday;
  }

  async findVillagerByBirthday() {
    const villagerData = await this.api.getVillagers();

    const result = villagerData.find(item => item.birthday = "9/3")
    const name = result.name[`name-USen`]
    console.log(name)
  }
}

module.exports = villagerView;
