import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API;

export const newPost = ({file, text, token}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text);
  return axios.post(`${apiEndpoint}/posts`, formData, {
    headers: {
      "Authorization": token
    }
  })
}

export const showPostsList = ({userId, perPage, page}) =>
  axios.get(`${apiEndpoint}/users/${userId}/posts?perPage=${perPage}&page=${page}`)

export const showCommentsList = ({postId, perPage, page}) =>
  axios.get(`${apiEndpoint}/posts/${postId}/comments?perPage=${perPage}&page=${page}`)

export const like = ({postId, token}) =>
  axios.post(`${apiEndpoint}/posts/${postId}/like`, null, {
    headers: {
      "Authorization": token
    }
  })

  export const unlike = ({postId, token}) =>
  axios.post(`${apiEndpoint}/posts/${postId}/unlike`, null, {
    headers: {
      "Authorization": token
    }
  })

  export const save = ({postId, token}) =>
  axios.post(`${apiEndpoint}/posts/${postId}/save`, null, {
    headers: {
      "Authorization": token
    }
  })

  export const unsave = ({postId, token}) =>
  axios.post(`${apiEndpoint}/posts/${postId}/unsave`, null, {
    headers: {
      "Authorization": token
    }
  })

  export const addComment = ({postId, text, token}) =>
  axios.post(`${apiEndpoint}/posts/${postId}/comments`, { text }, {
    headers: {
      "Authorization": token
    }
  })

  export const deleteComment = ({commentId, token}) =>
  axios.delete(`${apiEndpoint}/comments/${commentId}`, {
    headers: {
      "Authorization": token
    }
  })

  export const deletePost = ({postId, token}) =>
  axios.delete(`${apiEndpoint}/posts/${postId}`, {
    headers: {
      "Authorization": token
    }
  })