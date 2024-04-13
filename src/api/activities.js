import { defineWeek } from "../utils/defineWeek";
import axiosClient from "./axiosClient";

const getActivities = async ({ request }) => {
  try {
    const week = defineWeek();
    console.log(week);

    const queryParams = {
      start: week.formattedMonday,
      end: week.formattedSunday,
    };

    const queryString = new URLSearchParams(queryParams);

    const response = await axiosClient.get(`activities?${queryString}`);

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export { getActivities };
