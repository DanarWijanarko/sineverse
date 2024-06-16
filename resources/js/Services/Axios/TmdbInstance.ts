import axios, { AxiosInstance } from "axios";

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
export const baseImgUrl = import.meta.env.VITE_TMDB_BASE_IMG_URL;

export const tmdbInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    params: { api_key: apiKey },
});
