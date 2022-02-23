import axios from "axios";

const URL = "https://saramserver.herokuapp.com/set";

export const list = async () => {
  const { data } = await axios.get(URL);
  return data;
};

export const create = async (name, ids) => {
  const { data } = await axios.post(URL + "/create", { name, ids });
  return data;
};

export const updateName = async (name, _id) => {
  const { data } = await axios.patch(URL + "/update/name", { name, _id });
  return data;
};

export const deleteSet = async (_id) => {
  const { data } = await axios({
    url: URL + "/delete",
    data: { _id },
    method: "DELETE",
  });
  return data;
};
