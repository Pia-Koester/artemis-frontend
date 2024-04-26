import axiosClient from "./axiosClient";

const getMembershipPlans = async () => {
  try {
    const response = await axiosClient.get(`membershipplan`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getMembershipPlans };
