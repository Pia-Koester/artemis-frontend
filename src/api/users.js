import axiosClient from "./axiosClient";

const getUsers = async () => {
  try {
    const response = await axiosClient.get(`/users`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export { getUsers };
