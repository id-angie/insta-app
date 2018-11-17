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
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    })
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
    .catch((error) => {
      console.log(error);
      alert(error);
    })
  }
};

export const toggleFollow = (userId, isFollow) => {
  return (dispatch, getState) => {
    const {
      currentUser: {
        user: currentUser,
        token
      }
    } = getState();

    if (!currentUser) {
      alert('Авторизуйтесь!');
      return;
    }

    if (isFollow === false || window.confirm("Отписаться?")) {
      const promise = isFollow ?
        api.unfollow({userId, token}) :
        api.follow({userId, token});

      promise
        .catch((error) => (
          dispatch({
            type: 'TOGGLE_FOLLOW',
            userId,
            isFollow: !isFollow
          })
        ));

      dispatch({
        type: 'TOGGLE_FOLLOW',
        userId,
        isFollow
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

export const editInfo = (user) => {
  return (dispatch) => {
    api.editInfo(user)
    .then((body) => {
      alert('Изменения сохранены');
      dispatch({
        type: 'EDIT_INFO',
        user: body.data.user
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}