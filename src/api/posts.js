const apiEndpoint = process.env.REACT_APP_API;
export const showPostsList = ({userId, perPage, page}) =>
  fetch(`${apiEndpoint}/users/${userId}/posts?perPage=${perPage}&page=${page}`)
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Ошибка вывода постов');
    })

export const showCommentsList = ({postId, perPage, page}) =>
  fetch(`${apiEndpoint}/posts/${postId}/comments?perPage=${perPage}&page=${page}`)
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Ошибка вывода комментариев');
    })

export const like = ({postId, token}) =>
  fetch(`${apiEndpoint}/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      "Authorization": token
    }
  })
  .then((res) => {
    if (res.ok)
      return res.json();
    else
      throw new Error('Ошибка');
  })

  export const unlike = ({postId, token}) =>
  fetch(`${apiEndpoint}/posts/${postId}/unlike`, {
    method: 'POST',
    headers: {
      "Authorization": token
    }
  })
  .then((res) => {
    if (res.ok)
      return res.json();
    else
      throw new Error('Ошибка');
  })
