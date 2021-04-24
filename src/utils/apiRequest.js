import axios from "axios";
let HOST = "http://127.0.0.1:3001";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${Cookies.get("jwt")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const testing = async () => {
  try {
    const request = axios.get(`${HOST}/`, { withCredentials: true });
    const response = await request;
    return response;
  } catch (e) {
    return e;
  }
};

export const getInvitationInfo = async (token) => {
  try {
    const response = await axios.get(
      `${HOST}/api/v1/organizations/invitation/${token}`
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};