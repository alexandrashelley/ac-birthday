class apiAC {
  getVillagers = async () => {
    const response = await fetch("http://acnhapi.com/v1a/villagers/");
    const data = await response.json();
    return data;
  };

  getSongs = async () => {
    const response = await fetch("https://acnhapi.com/v1/music/19");
    const data = await response.blob();
    return data;
  };

  getVillagersNookipedia = async (villagerName) => {
    const apiKey = "05ef8e17-fa84-4ce4-98c8-8db023ec4398";

    const response = await fetch(`https://api.nookipedia.com/villagers?name=${villagerName}`, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    const data = await response.json();
    return data;
  };

  getMoon = async () => {
    const apiKey = "05ef8e17-fa84-4ce4-98c8-8db023ec4398";

    const response = await fetch(`https://api.nookipedia.com/nh/recipes/moon`, {
      headers: {
        "X-API-KEY": apiKey
      }
    })

    const data = await response.json();
    return(data)
  }
}

//https://api.nookipedia.com/nh/recipes/crescent-moon_chair

module.exports = apiAC;