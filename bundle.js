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
          const response = await fetch("http://acnhapi.com/v1/villagers/");
          return response.json();
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
          console.log(this.mainContainerEl, "hello");
        }
        async displayVillagersFromApi() {
          this.api.getVillagers((villagerData) => {
            villagerData.forEach((villager) => {
              console.log(villager, "hello");
              const villagerParagraph = document.createElement("p");
              villagerParagraph.className = "villager";
              villagerParagraph.textContent = villager;
              this.mainContainerEl.append(villagerParagraph);
              console.log(villagerParagraph, "hello");
            });
          });
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
  view.displayVillagersFromApi();
})();
