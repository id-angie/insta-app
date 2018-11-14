import * as api from '../api/users';

export const fetchUser = (userId) => {
  return (dispatch) => {
    api.showUser(userId)
    .then((body) => {
      dispatch({
        type: 'FETCH_USER',
        user: body.data.user
      })
    });
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