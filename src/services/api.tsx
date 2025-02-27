import axios from "axios";

const apiKey = "6a9d9a4c17806d2107cf16eea0659a8c";
const baseURL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/trending/movie/week`, {
      params: { api_key: apiKey, language: "pt-BR", page: 1 },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/popular`, {
      params: { api_key: apiKey, language: "pt-BR", page: 1 },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
