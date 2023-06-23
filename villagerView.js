const api = require("./apiAC");
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
      this.getVillagerImageURL();
      //this.playBirthdaySong();
    });
  }

  displayVillagerName(villager) {
    const villagerParagraph = document.createElement("p");
    villagerParagraph.className = "villager";

    if (villager.length === 1) {
      villagerParagraph.textContent = `Your birthday buddy is ${villager}!`;
    } else {
      villagerParagraph.textContent = `Your birthday buddies are ${villager[0]} and ${villager[1]}!`;
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

  searchByValue(arr, value) {
    const matches = [];

    for (let obj of arr) {
      if (obj.birthday === value) {
        matches.push(obj);
      }
      if (obj.children) {
        let result = this.searchByValue(obj.children, value);
        if (result.length > 0) {
          matches.push(...result);
        }
      }
    }
    return matches;
  }

  async findVillagerByBirthday() {
    const villagerData = await this.api.getVillagers();
    const searchValue = this.formattedDate();
    const result = this.searchByValue(villagerData, searchValue);

    if (result) {
      return result.map((a) => a.name["name-USen"]);
    } else {
      console.log("error");
      this.displayError();
    }
  }
  
  async getVillagerImageURL() {
    const villagerNames = await this.findVillagerByBirthday();

    const villagerArray = await Promise.all(
      villagerNames.map((villager) => this.api.getVillagersNookipedia(villager))
    );

    const flattenedArray = villagerArray.flatMap((innerArray) => innerArray);
    const imageUrls = flattenedArray.map((villager) => villager.image_url);

    return imageUrls;
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

  async playBirthdaySong() {
    const audio = await this.api.getSongs();
    const audioURL = URL.createObjectURL(audio);
    document.querySelector("#audio-player").src = audioURL;
  }
}

// picture of rare item if birthday is 15th april
// 31st october returning undefined and undefined

module.exports = villagerView;
