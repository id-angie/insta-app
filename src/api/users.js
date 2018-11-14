const apiEndpoint = process.env.REACT_APP_API;

export const login = ({nickname, password}) =>
  fetch(`${apiEndpoint}/login`, {
    method: 'POST',
    body: JSON.stringify({nickname, password}),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
  .then((res) => res.json());

export const showUser = (userId) =>
  fetch(`${apiEndpoint}/users/${userId}`)
    .then((res) => res.json());

export const showUsersList = ({perPage, page}) =>
  fetch(`${apiEndpoint}/users?perPage=${perPage}&page=${page}`)
    .then((res) => res.json());

export const registration = ({nickname, name, password}) =>
  fetch(`${apiEndpoint}/users`, {
    method: 'POST',
    body: JSON.stringify({nickname, name, password}),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
  .then((res) => res.json());

export const follow = ({userId, token}) =>
  fetch(`${apiEndpoint}/users/${userId}/follow`, {
    method: 'POST',
    body: JSON.stringify({userId}),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": token
    }
  })
  .then((res) => res.json());