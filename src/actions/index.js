import * as api from '../api/users';

export const login = (nickname, password) => {
  return (dispatch) => {
    api.login({nickname, password})
    .then((body) => {
      console.log(body)
      dispatch({
        type: 'LOGIN',
        token: body.data.token,
        user: body.data.user
      })
    });
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const toggleFollow = (currentUser, userId, isFollow) => {
  if (!currentUser) {
    alert('Авторизуйтесь!');
    return;
  }

  if (isFollow === false || window.confirm("Отписаться?")) {
    return ({
      type: 'TOGGLE_FOLLOW',
      updatedFollowing: isFollow ?
        currentUser.following.filter((user) => user !== userId) :
        currentUser.following.concat(userId)
    })
  }
};

export const registration = (nickname, name, password) => {
  return (dispatch) => {
    api.registration({nickname, name, password})
    .then((body) => {
      dispatch({
        type: 'REGISTRATION',
        user: body.data.user
      })
    })
  }
};

export const newPost = (file, text) => ({
  type: 'NEW_POST',
  file,
  text
});