import axios from "axios";
const apiEp = "http://localhost:8000/api/v1/task/";

export const fetchTask = async () => {
  try {
      const result = await axios.get(apiEp);
      console.log(result);
    return result.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
