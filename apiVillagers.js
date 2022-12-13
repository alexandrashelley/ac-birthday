class apiVillagers {
  getVillagers = async () => {
    const response = await fetch("http://acnhapi.com/v1a/villagers/");
    const data = await response.json();
    return data;
  };
}

module.exports = apiVillagers;
