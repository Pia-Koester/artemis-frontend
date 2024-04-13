import axios from "axios";

//To Do: only for dev! Change in Prod

const axiosClient = axios.create({
  baseURL: `https://artemisbooking.cyclic.app/api` || "",
  withCredentials: true,
});

export default axiosClient;
