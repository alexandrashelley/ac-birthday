const api = require("./apiVillagers");

class villagerView {
  constructor(api) {
    this.api = api;
    this.mainContainerEl = document.querySelector("#villager-data");
    this.birthdayInput = document.querySelector("#birthday-input");
    this.submitButton = document.querySelector("#submit-birthday");

    this.submitButton.addEventListener("click", async () => {
      const formattedDate = this.formattedDate();
      const villager = await this.findVillagerByBirthday(formattedDate);
      this.displayVillagerName(villager);
    });
  }

  displayVillagerName(villager) {
    const villagerParagraph = document.createElement("p");
    villagerParagraph.className = "villager";
    villagerParagraph.textContent = villager;
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
    for (let obj of arr) {
      if (obj.birthday === value) {
        return obj;
      }
      if (obj.children) {
        let result = findValue(obj.children, value);
        if (result) {
          return result;
        }
      }
    }
    undefined;
  }

  async findVillagerByBirthday() {
    const villagerData = await this.api.getVillagers();
    const searchValue = this.formattedDate();
    const result = this.searchNestedObject(villagerData, searchValue);

    if (result) {
      return result.name["name-USen"];
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
}

module.exports = villagerView;
