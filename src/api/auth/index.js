import axios from 'axios';

const TOKEN_URL = process.env.NEXT_PUBLIC_TOKEN_URL;
const AUTH_USERNAME = process.env.NEXT_PUBLIC_AUTH_USERNAME;
const AUTH_PASSWORD = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

export const login = async (body) => {
    return axios.post(`${TOKEN_URL}?grant_type=password&username=${body.username}&password=${body.password}`,
    null, {
    auth: {
      username: AUTH_USERNAME,
      password: AUTH_PASSWORD,
    },
  }).catch((error) => {
    return error;
  });
};
