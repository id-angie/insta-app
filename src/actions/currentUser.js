import * as api from '../api/users';

export const login = (nickname, password) => {
  return (dispatch) => {
    api.login({nickname, password})
    .then((body) => {
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

export const toggleFollow = (userId, isFollow) => {
  return (dispatch, getState) => {
    const {
      currentUser: {
        user: currentUser
      }
    } = getState();

    if (!currentUser) {
      alert('Авторизуйтесь!');
      return;
    }

    if (isFollow === false || window.confirm("Отписаться?")) {
      dispatch({
        type: 'TOGGLE_FOLLOW',
        updatedFollowing: isFollow ?
          currentUser.following.filter((user) => user !== userId) :
          currentUser.following.concat(userId)
      });
    }
  }
};

export const newPost = (file, text) => {
  alert(`added new post: ${file} with text: '${text}'`);
  return {
    type: 'NEW_POST',
    file,
    text
  };
}