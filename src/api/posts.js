const apiEndpoint = process.env.REACT_APP_API;

export const newPost = ({file, text, token}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text);
  return fetch(`${apiEndpoint}/posts`, {
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": token
    }
  })
  .then((res) => {
    if (res.ok)
      return res.json();
    else
      throw new Error('Ошибка загрузки');
  });
}

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

  export const save = ({postId, token}) =>
  fetch(`${apiEndpoint}/posts/${postId}/save`, {
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

  export const unsave = ({postId, token}) =>
  fetch(`${apiEndpoint}/posts/${postId}/unsave`, {
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

  export const addComment = ({postId, text, token}) =>
  fetch(`${apiEndpoint}/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({text}),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  .then((res) => {
    if (res.ok)
      return res.json();
    else
      throw new Error('Ошибка');
  })

  export const deleteComment = ({commentId, token}) =>
  fetch(`${apiEndpoint}/comments/${commentId}`, {
    method: 'DELETE',
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