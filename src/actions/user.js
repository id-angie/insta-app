import * as apiUsers from '../api/users';
import * as apiPosts from '../api/posts';

export const fetchUser = (userId) => {
  return (dispatch) => {
    apiUsers.showUser(userId)
    .then((body) => {
      dispatch({
        type: 'FETCH_USER',
        user: body.data.user
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    })
  }
};

export const toggleLike = (postId, isLiked) => {
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

    dispatch({
      type: 'TOGGLE_LIKE',
      postId,
      currentUserId: currentUser.nickname,
      isLiked
    })
  }
};

export const toggleSave = (postId, isSaved) => {
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

    dispatch({
      type: 'TOGGLE_SAVE',
      postId,
      currentUserId: currentUser.nickname,
      isSaved
    })
  }
};

export const addComment = (postId, comment) => {
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

    if (comment === '') return;

    dispatch({
      type: 'ADD_COMMENT',
      postId,
      currentUserId: currentUser.nickname,
      comment
    })
  }
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_COMMENT',
      postId,
      commentId
    })
  }
};