import axios from "axios";

const URL = "https://saramserver.herokuapp.com/category";

export const itList = async () => {
  const { data } = await axios.get(URL + "/it");
  return data;
};

export default { itList };
