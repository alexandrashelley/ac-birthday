class apiVillagers {
  getVillagers = () => {
    fetch("http://acnhapi.com/v1/villagers/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
}
module.exports = apiVillagers;
// // .then(res => {
//   if (res.ok) {
//     console.log("Success")
//   } else {
//     console.log("Unsuccessful")
//   }
// })
// .then((response => console.log(response.json())
// .then((data) => console.log(data)
// .catch(error => console.log("Error"))