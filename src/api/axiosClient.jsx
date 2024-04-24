import axios from "axios";

//To Do: only for dev! Change in Prod

const axiosClient = axios.create({
  baseURL: `https://booking.artemis-sports.de/api`,
  withCredentials: true,
});

export default axiosClient;
