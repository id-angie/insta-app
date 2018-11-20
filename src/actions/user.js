import * as apiUsers from '../api/users';
import * as apiPosts from '../api/posts';

const checkAuth = (dispatch, getState) => {
  const {
    currentUser: {
      user: currentUser,
      token
    }
  } = getState();

  if (!currentUser) {
    alert('Авторизуйтесь!');
    return false;
  }
  return { currentUser, token };
}

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

export const showPostsList = (perPage, page) => {
  return (dispatch, getState) => {
    const {
      user: {
        user: {
          _id: userId
        }
      }
    } = getState();

    return apiPosts.showPostsList({userId, perPage, page})
      .then((body) =>
        dispatch({
          type: 'SHOW_POSTS_LIST',
          feed: body.data
        })
      )
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }
};

export const showCommentsList = (postId, perPage, page) => {
  return (dispatch) => {
    return apiPosts.showCommentsList({postId, perPage, page})
      .then((body) =>
        dispatch({
          type: 'SHOW_COMMENTS_LIST',
          postId: postId,
          comments: body.data
        })
      )
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }
};


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