const api = require("./apiVillagers");

class villagerView {
  constructor(api) {
    this.api = api;
    this.mainContainerEl = document.querySelector("#villager-data");
    this.birthdayInput = document.querySelector("#birthday-input");
    this.submitButton = document.querySelector("#submit-birthday");

    this.submitButton.addEventListener("click", async () => {
      this.removeVillagarParagraph();
      const formattedDate = this.formattedDate();
      const villager = await this.findVillagerByBirthday(formattedDate);
      this.displayVillagerName(villager);
    });
  }

  displayVillagerName(villager) {
    const villagerParagraph = document.createElement("p");
    villagerParagraph.className = "villager";

    if (villager.length === 1) {
      villagerParagraph.textContent = `Your birthday buddy is ${villager}!`;
    } else {
      villagerParagraph.textContent = `Your birthday buddies are ${villager[0]} and ${villager[1]}`;
    }

    this.mainContainerEl.append(villagerParagraph);
  }

  formattedDate() {
    const date = this.birthdayInput.value;
    const parts = date.split("-");
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const formattedBirthday = `${day}/${month}`;
    return formattedBirthday;
  }

  searchNestedObject(arr, value) {
    const matches = [];

    for (let obj of arr) {
      if (obj.birthday === value) {
        matches.push(obj);
      }
      if (obj.children) {
        let result = this.searchNestedObject(obj.children, value);
        if (result) {
          matches.push(result);
        }
      }
    }
    if (matches.length > 0) {
      return matches.map((a) => a.name["name-USen"]);
    } else {
      undefined;
    }
  }

  async findVillagerByBirthday() {
    const villagerData = await this.api.getVillagers();
    const searchValue = this.formattedDate();
    const result = this.searchNestedObject(villagerData, searchValue);

    if (result) {
      return result;
    } else {
      console.log("error");
      this.displayError();
    }
  }

  displayError() {
    const errorDiv = document.createElement("div");
    errorDiv.className = "search-error";
    errorDiv.textContent = "Sorry! We couldn't find your birthday buddy :(";
    this.mainContainerEl.append(errorDiv);
  }

  removeVillagarParagraph() {
    document.querySelectorAll(".villager").forEach((e) => e.remove());
  }
}

// database with transparent villager images
// picture of rare item if birthday is 15th april

module.exports = villagerView;
