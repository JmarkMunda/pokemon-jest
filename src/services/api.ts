import apiInstance from "./config";

export const getPokemonsAsync = async (search = "", limit = 20, offet = 0) => {
  try {
    const res = await apiInstance.get(
      `/pokemon/${search}?limit=${limit}&offset=${offet}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const getPokemonDetailsAsync = async (id: string) => {
  try {
    const res = await apiInstance.get(`/pokemon/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};
