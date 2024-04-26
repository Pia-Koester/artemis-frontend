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
    console.log("api response", response.data);

    const activitiesByWeekday = response.data.reduce(
      (accumulator, activity) => {
        const { weekday } = activity;
        accumulator[weekday] = accumulator[weekday] || [];
        accumulator[weekday].push(activity);
        return accumulator;
      },
      {}
    );

    const data = {
      weekstart: week.shortMonday,
      weekend: week.shortSunday,
      activities: activitiesByWeekday,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

const getActivity = async ({ params }) => {
  try {
    const { id } = params;
    const response = await axiosClient.get(`activities/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getActivities, getActivity };
