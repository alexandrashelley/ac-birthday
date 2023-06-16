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
      };
      module.exports = villagerView2;
    }
  });

  // index.js
  var apiVillagers = require_apiVillagers();
  var villagerView = require_villagerView();
  var api = new apiVillagers();
  var view = new villagerView(api);
})();
