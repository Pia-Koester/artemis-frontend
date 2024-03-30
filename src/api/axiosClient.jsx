import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://artemisbooking.cyclic.app/api`,
});

export default axiosClient;
