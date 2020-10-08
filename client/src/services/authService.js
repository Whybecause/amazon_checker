import axios from "axios";

export const login = async (data) => {
  const result = await axios.post("/api/login", data);
  return result;
};

export const logout = async () => {
  return axios.get("/api/logout");
};

export const getCurrentUser = async (setCurrentUser) => {
  const result = await axios.get("/api/user");
  if (result.data !== undefined) {
    return setCurrentUser(result.data.id);
  } else {
    return setCurrentUser(undefined);
  }
};
