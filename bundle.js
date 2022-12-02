(() => {
  // index.js
  var getVillagers = () => {
    fetch("http://acnhapi.com/v1/villagers/").then((response) => response.json()).then((data) => console.log(data));
  };
  getVillagers();
})();
