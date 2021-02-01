import axios from 'axios';

export const verifyEmail = email => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/verify&email=${email}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export const registerUser = params => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/register`, null, { params: params })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
