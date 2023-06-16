(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // apiVillagers.js
  var require_apiVillagers = __commonJS({
    "apiVillagers.js"(exports, module) {
      var apiVillagers2 = class {
        getVillagers = async () => {
          const response = await fetch("http://acnhapi.com/v1a/villagers/");
          const data = await response.json();
          console.log(data);
          return data;
        };
      };
      module.exports = apiVillagers2;
    }
  });

  // villagerView.js
  var require_villagerView = __commonJS({
    "villagerView.js"(exports, module) {
      var api2 = require_apiVillagers();
      var villagerView2 = class {
        constructor(api3) {
          this.api = api3;
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
          const parts = date.split("-");
          const month = parseInt(parts[1]);
          const day = parseInt(parts[2]);
          const formattedBirthday = `${day}/${month}`;
          return formattedBirthday;
        }
        async findVillagerByBirthday() {
          const villagerData = await this.api.getVillagers();
          const result = villagerData.find((item) => item.birthday = "9/3");
          const name = result.name[`name-USen`];
          console.log(name);
        }
      };
      module.exports = villagerView2;
    }
  });

  // index.js
  var apiVillagers = require_apiVillagers();
  var villagerView = require_villagerView();
  var api = new apiVillagers();
  var view = new villagerView(api);
  view.displayVillagerNamesFromApi();
  view.findVillagerByBirthday();
})();
