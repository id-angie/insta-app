import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API;

export const login = ({nickname, password}) =>
  axios.post(`${apiEndpoint}/login`, {
    nickname,
    password
  })

export const showUser = (userId) =>
  axios.get(`${apiEndpoint}/users/${userId}`)

export const showUsersList = ({perPage, page}) =>
  axios.get(`${apiEndpoint}/users?perPage=${perPage}&page=${page}`)

export const registration = ({nickname, name, password}) =>
  axios.post(`${apiEndpoint}/users`, {
    nickname,
    name,
    password
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })

export const editInfo = ({user, token}) => {
  const formData = new FormData();
  Object.keys(user).forEach((item) => {formData.append(item, user[item])});
  return axios.put(`${apiEndpoint}/users`, formData, {
    headers: {
      'Authorization': token
    }
  })
}

export const follow = ({userId, token}) =>
  axios.post(`${apiEndpoint}/users/${userId}/follow`, null, {
    headers: {
      "Authorization": token
    }
  })

export const unfollow = ({userId, token}) =>
  axios.post(`${apiEndpoint}/users/${userId}/unfollow`, null, {
    headers: {
      "Authorization": token
    }
  })