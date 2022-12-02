(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // apiVillagers.js
  var require_apiVillagers = __commonJS({
    "apiVillagers.js"(exports, module) {
      var apiVillagers2 = class {
        getVillagers = () => {
          fetch("http://acnhapi.com/v1/villagers/").then((response) => response.json()).then((data) => console.log(data));
        };
      };
      module.exports = apiVillagers2;
    }
  });

  // index.js
  var apiVillagers = require_apiVillagers();
  var api = new apiVillagers();
  api.getVillagers();
})();
