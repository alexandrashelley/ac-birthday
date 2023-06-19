class apiAC {
  getVillagers = async () => {
    const response = await fetch("http://acnhapi.com/v1a/villagers/");
    const data = await response.json();
    return data;
  };

  getSongs = async () => {
    const response = await fetch("https://acnhapi.com/v1/music/19")
    const data = await response.blob();
    return data;
  }
}

module.exports = apiAC;