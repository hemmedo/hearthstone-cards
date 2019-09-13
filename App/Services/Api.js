import apisauce from "apisauce";

const create = (baseURL = "https://omgvamp-hearthstone-v1.p.rapidapi.com/") => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      "x-rapidapi-key": "7608902facmsh0042d6cd9f17392p1a30ebjsn05b1accb8e74"
    },
    timeout: 10000
  });

  //
  const getAllCards = () => api.get("cards");
  const searchCards = parameter => api.get("cards/search/" + parameter);

  return {
    getAllCards,
    searchCards
  };
};

export default {
  create
};
