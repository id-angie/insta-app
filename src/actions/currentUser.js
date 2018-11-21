import * as apiUsers from '../api/users';
import * as apiPosts from '../api/posts';

export const login = (nickname, password) => {
  return (dispatch) => {
    apiUsers.login({nickname, password})
    .then((body) => {
      dispatch({
        type: 'LOGIN',
        token: body.data.data.token,
        user: body.data.data.user
      })
    })
    .catch((error) => {
      console.log(error);
      alert('Неверное имя пользователя или пароль');
    })
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const registration = (nickname, name, password) => {
  return (dispatch) => {
    apiUsers.registration({nickname, name, password})
    .then((body) => {
      dispatch({
        type: 'REGISTRATION',
        user: body.data.data.user,
        token: body.data.data.token
      })
    })
          .catch((err) => {
            const error = err.response.data.data
            console.log(error);
            switch (error.name) {
              case 'DatabaseError':
                let errorName = error.errors.key;
                alert(`Имя ${errorName} уже занято`);
                break;

              case 'ValidationError':
                let errorInput;
                let errorType;

                if (error.errors.nickname) {
                  errorInput = 'Логин';
                  if (error.errors.nickname[0] === "The nickname must be at least 2 characters.")
                    errorType = 'менее 2';
                  else
                    errorType = 'более 200';
                }

                if (error.errors.name) {
                  errorInput = 'Имя';
                  if (error.errors.name[0] === "The name must be at least 3 characters.")
                    errorType = 'менее 3';
                  else
                    errorType = 'более 200';
                }

                if (error.errors.password) {
                  errorInput = 'Пароль';
                  if (error.errors.password[0] === "The password must be at least 2 characters.")
                    errorType = 'менее 2';
                  else
                    errorType = 'более 200';
                }

                alert(`Длина поля "${errorInput}" должна быть не ${errorType} символов`);
                break;

              default:
                alert('Ошибка');
            }
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
        apiUsers.unfollow({userId, token}) :
        apiUsers.follow({userId, token});

      promise
        .catch((error) => (
          dispatch({
            type: 'TOGGLE_FOLLOW',
            userId,
            currentUserId: currentUser._id,
            isFollow: !isFollow
          })
        ));

      dispatch({
        type: 'TOGGLE_FOLLOW',
        userId,
        currentUserId: currentUser._id,
        isFollow
      });
    }
  }
};

export const newPost = (file, text) => {
  return (dispatch, getState) => {
    const {
      currentUser: {
        token
      }
    } = getState();

    apiPosts.newPost({file, text, token})
    .then((body) => {
      alert('Добавлено!');
      dispatch({
        type: 'NEW_POST',
        file: body.data.data.file,
        text: body.data.data.text
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    })
  }
};

export const editInfo = (user) => {
  return (dispatch, getState) => {
    const {
      currentUser: {
        token
      }
    } = getState();

    apiUsers.editInfo({user, token})
    .then((body) => {
      alert('Изменения сохранены');
      dispatch({
        type: 'EDIT_INFO',
        user: body.data.data.user
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}