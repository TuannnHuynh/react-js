import axios from "../services/axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

export { fetchAllUser };
