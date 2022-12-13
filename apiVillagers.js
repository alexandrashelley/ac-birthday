class apiVillagers {
  getVillagers = async () => {
    const response = await fetch("http://acnhapi.com/v1/villagers/");
    const data = await response.json();
    console.log(data)
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
