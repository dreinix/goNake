import axios from "axios";
let HOST = "http://127.0.0.1:3001";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${Cookies.get("jwt")}`;
    console.log(config.headers.authorization)
    return config;
  },
  (error) => {
    console.log("not auth")
    return Promise.reject(error);
  }
);

export const testing = async () => {
  try {
    const request = axios.get(`${HOST}/`);
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