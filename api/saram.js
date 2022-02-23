import axios from "axios";

const URL = "https://saramserver.herokuapp.com/saram";

export const saramList = async (keywords) => {
  const {
    data: {
      jobs: { job },
    },
  } = await axios.post(URL, { keywords });
  return job;
};

export const saramDetail = async ({ queryKey }) => {
  const id = queryKey[1];
  const {
    data: {
      jobs: { job },
    },
  } = await axios.get(URL + "/" + id);
  return job;
};

export default { saramList };
