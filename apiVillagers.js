class apiVillagers {
  getVillagers = async () => {
    const response = await fetch("http://acnhapi.com/v1a/villagers/");
    const data = await response.json();
    console.log(data)
    return data;
  };
}

module.exports = apiVillagers;
