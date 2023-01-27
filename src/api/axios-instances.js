import axios from "axios";

export const estatery = axios.create({
  baseURL:
    "https://estatery-backend.netlify.app/.netlify/functions/api/estatery",
});
