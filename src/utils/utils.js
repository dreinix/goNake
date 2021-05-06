import Cookies from "js-cookie";
import axios from "axios";

let HOST = "http://127.0.0.1:3001";

export function getCookie(cname) {
  return Cookies.get(cname);
}
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  var multyplayer = 1 * 60 * 60 * 1000; // to hour
  d.setTime(d.getTime() + exdays * multyplayer); // from miliseconds to days;
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export async function loginUser(usrn, pwd) {
  try {
    let response = await axios
      .post(`${HOST}/api/users/login`, {
        username: usrn,
        password: pwd,
      })
      .catch((err) => {
        console.log(err);
        if (!err.status) {
          return "Server down";
        }
      });
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function signupUser(usrn, pwd, name) {
  try {
    let response = await axios
      .post(`${HOST}/api/users/`, {
        username: usrn,
        password: pwd,
        name: name,
      })
      .catch((err) => {
        if (!err.status) {
          return "Server down";
        }
      });

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getCurrentUser() {
  try {
    let response = await axios.get(`${HOST}/api/users/getMe`).catch((err) => {
      if (!err.status) {
        return "Server down";
      }
    });
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getTopScores() {
  try {
    let response = axios.get(`${HOST}/api/scores/top`).catch((err) => {
      if (!err.status) {
        return "Server down";
      }
    });
    return response;
  } catch (e) {
    return e;
  }
}

export async function getAllScores() {
  try {
    let response = await axios.get(`${HOST}/api/scores/`).catch((err) => {
      if (!err.status) {
        return "Server down";
      }
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export function saveScore(value) {
  if (getCookie("jwt")) {
    try {
      axios
        .post(
          `${HOST}/api/scores/`,
          { value: value },
          { withCredentials: true }
        )
        .catch((err) => {
          if (!err.status) {
            console.log(err);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
