import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
