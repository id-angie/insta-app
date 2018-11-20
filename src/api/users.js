const apiEndpoint = process.env.REACT_APP_API;

export const login = ({nickname, password}) =>
  fetch(`${apiEndpoint}/login`, {
    method: 'POST',
    body: JSON.stringify({nickname, password}),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Неверное имя пользователя или пароль');
    })

export const showUser = (userId) =>
  fetch(`${apiEndpoint}/users/${userId}`)
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Пользователь не найден');
    })

export const showUsersList = ({perPage, page}) =>
  fetch(`${apiEndpoint}/users?perPage=${perPage}&page=${page}`)
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Ошибка вывода списка пользователей');
    })

export const registration = ({nickname, name, password}) =>
  fetch(`${apiEndpoint}/users`, {
    method: 'POST',
    body: JSON.stringify({nickname, name, password}),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.ok)
        return res.json();
      else {
        return res.json()
          .then((body) => {
            switch (body.data.name) {
              case 'DatabaseError':
                let errorName = body.data.errors.key;
                throw new Error(`Имя ${errorName} уже занято`);

              case 'ValidationError':
                let errorInput;
                let errorType;

                if (body.data.errors.nickname) {
                  errorInput = 'Логин';
                  if (body.data.errors.nickname[0] === "The nickname must be at least 2 characters.")
                    errorType = 'менее 2';
                  else
                    errorType = 'более 200';
                }

                if (body.data.errors.name) {
                  errorInput = 'Имя';
                  if (body.data.errors.name[0] === "The name must be at least 3 characters.")
                    errorType = 'менее 3';
                  else
                    errorType = 'более 200';
                }

                if (body.data.errors.password) {
                  errorInput = 'Пароль';
                  if (body.data.errors.password[0] === "The password must be at least 2 characters.")
                    errorType = 'менее 2';
                  else
                    errorType = 'более 200';
                }

                throw new Error(`Длина поля "${errorInput}" должна быть не ${errorType} символов`);

              default:
                throw new Error('Ошибка');
            }
          })
      }
    })

export const editInfo = ({user, token}) =>
  fetch(`${apiEndpoint}/users/${user._id}`, {
    method: 'PUT',
    body: JSON.stringify({user}),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": token
    }
  })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Ошибка');
    })

export const follow = ({userId, token}) =>
  fetch(`${apiEndpoint}/users/${userId}/follow`, {
    method: 'POST',
    headers: {
      "Authorization": token
    }
  })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Пользователь не найден');
    })

export const unfollow = ({userId, token}) =>
  fetch(`${apiEndpoint}/users/${userId}/unfollow`, {
    method: 'POST',
    headers: {
      "Authorization": token
    }
  })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Пользователь не найден');
    })