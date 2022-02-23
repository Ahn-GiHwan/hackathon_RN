import axios from "axios";

const URL = "https://saramserver.herokuapp.com/memo";

export const getMemo = async ({ queryKey }) => {
  const id = queryKey[1];
  const { data } = await axios.get(URL + "/" + id);
  return data;
};

export const setMemo = async (id, text) => {
  const { data } = await axios.post(URL + "/" + id, { text });
  return data;
};
