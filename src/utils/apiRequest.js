import axios from "axios";
let HOST = "http://127.0.0.1:3001";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${Cookies.get("jwt")}`;
    //console.log(config.headers.authorization)
    return config;
  },
  (error) => {
    console.log("not auth")
    return Promise.reject(error);
  }
);

export const auth = async () => {
  try {
    const request = axios.get(`${HOST}/`);
    const response = await request;
    return response;
  } catch (e) {
    return e;
  }
};

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  //var multyplayer = 1*60*60*1000
  var multyplayer = 1*60*1000
  d.setTime(d.getTime() + (exdays*multyplayer))// from miliseconds to days;
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}