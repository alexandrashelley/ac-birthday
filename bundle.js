(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // apiAC.js
  var require_apiAC = __commonJS({
    "apiAC.js"(exports, module) {
      var apiAC2 = class {
        getVillagers = async () => {
          const response = await fetch("http://acnhapi.com/v1a/villagers/");
          const data = await response.json();
          return data;
        };
        getSongs = async () => {
          const response = await fetch("https://acnhapi.com/v1/music/19");
          const data = await response.blob();
          return data;
        };
        getVillagersNookipedia = async (villagerName) => {
          const apiKey = "05ef8e17-fa84-4ce4-98c8-8db023ec4398";
          const response = await fetch(`https://api.nookipedia.com/villagers?name=${villagerName}`, {
            headers: {
              "X-API-KEY": apiKey
            }
          });
          const data = await response.json();
          return data;
        };
      };
      module.exports = apiAC2;
    }
  });

  // villagerView.js
  var require_villagerView = __commonJS({
    "villagerView.js"(exports, module) {
      var api2 = require_apiAC();
      var villagerView2 = class {
        constructor(api3) {
          this.api = api3;
          this.mainContainerEl = document.querySelector("#villager-data");
          this.birthdayInput = document.querySelector("#birthday-input");
          this.submitButton = document.querySelector("#submit-birthday");
          this.submitButton.addEventListener("click", async () => {
            this.removeVillagerParagraph();
            this.removeVillagerImage();
            const formattedDate = this.formattedDate();
            const villager = await this.findVillagerByBirthday(formattedDate);
            this.displayVillagerName(villager);
            this.getVillagerImageURL();
            this.playBirthdaySong();
            this.displayVillagerImage();
          });
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
        async displayVillagerImage() {
          const imageSrc = await this.getVillagerImageURL();
          if (imageSrc.length > 1) {
            const villagerImage1 = document.createElement("img");
            const villagerImage2 = document.createElement("img");
            villagerImage1.className = "villager-image";
            villagerImage2.className = "villager-image";
            villagerImage1.src = imageSrc[0];
            villagerImage2.src = imageSrc[1];
            this.mainContainerEl.append(villagerImage1, villagerImage2);
          } else {
            const villagerImage1 = document.createElement("img");
            villagerImage1.src = imageSrc[0];
            this.mainContainerEl.append(villagerImage1);
          }
        }
        removeVillagerParagraph() {
          document.querySelectorAll(".villager").forEach((e) => e.remove());
        }
        removeVillagerImage() {
          document.querySelectorAll("img").forEach((e) => e.remove());
        }
        displayError() {
          const errorDiv = document.createElement("div");
          errorDiv.className = "search-error";
          errorDiv.textContent = "Sorry! We couldn't find your birthday buddy :(";
          this.mainContainerEl.append(errorDiv);
        }
        async playBirthdaySong() {
          const audio = await this.api.getSongs();
          const audioURL = URL.createObjectURL(audio);
          document.querySelector("#audio-player").src = audioURL;
        }
      };
      module.exports = villagerView2;
    }
  });

  // index.js
  var apiAC = require_apiAC();
  var villagerView = require_villagerView();
  var api = new apiAC();
  var view = new villagerView(api);
})();
