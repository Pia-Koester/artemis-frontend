import { defineWeek } from "../utils/defineWeek";
import axiosClient from "./axiosClient";

const getActivities = async ({ request }) => {
  try {
    const parameterurl = new URL(request.url);
    const instructor = parameterurl.searchParams.get("instructor");
    const skip = parameterurl.searchParams.get("skip");
    const type = parameterurl.searchParams.get("type");
    const week = defineWeek(skip);
    console.log(week);

    const queryParams = {
      start: week.formattedMonday,
      end: week.formattedSunday,
    };

    if (
      instructor !== null &&
      instructor !== undefined &&
      instructor !== "All"
    ) {
      queryParams.instructor = instructor;
    }

    if (type !== null && type !== undefined && type !== "All") {
      queryParams.type = type;
    }

    const queryString = new URLSearchParams(queryParams);

    const response = await axiosClient.get(`activities?${queryString}`);
    console.log("api response", response.data);

    const instructors = [];
    const activitytypes = [];

    const activitiesByWeekday = response.data.reduce(
      (accumulator, activity) => {
        const { weekday, instructor, type } = activity;
        accumulator[weekday] = accumulator[weekday] || [];
        accumulator[weekday].push(activity);

        if (!instructors.includes(instructor)) {
          instructors.push(instructor);
        }

        if (!activitytypes.includes(type?.type)) {
          activitytypes.push(type?.type);
        }

        return accumulator;
      },
      {}
    );

    const data = {
      weekstart: week.shortMonday,
      weekend: week.shortSunday,
      activities: activitiesByWeekday,
      instructors: instructors,
      activitytypes,
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
