const apiVillagers = require ('./apiVillagers');
const villagerView = require('./villagerView');
const api = new apiVillagers();
const view = new villagerView(api)

// //view.displayVillagerNamesFromApi();
// view.findVillagerByBirthday();