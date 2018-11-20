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

export const toggleLike = (postId, isLiked) => {
  return (dispatch, getState) => {
    const {
      currentUser,
      token
    } = checkAuth(dispatch, getState);

    if (!currentUser) return;

    const promise = isLiked ?
      apiPosts.unlike({postId, token}) :
      apiPosts.like({postId, token});


    promise
      .catch((error) => (
        dispatch({
          type: 'TOGGLE_LIKE',
          postId,
          currentUserId: currentUser._id,
          isLiked: !isLiked
        })
      ));

    dispatch({
      type: 'TOGGLE_LIKE',
      postId,
      currentUserId: currentUser._id,
      isLiked: isLiked
    });
  }
};

export const toggleSave = (postId, isSaved) => {
  return (dispatch, getState) => {
    const {
      currentUser,
      token
    } = checkAuth(dispatch, getState);

    if (!currentUser) return;

    const promise = isSaved ?
      apiPosts.unsave({postId, token}) :
      apiPosts.save({postId, token});


    promise
      .catch((error) => (
        dispatch({
          type: 'TOGGLE_SAVE',
          postId,
          currentUserId: currentUser._id,
          isSaved: !isSaved
        })
      ));

    dispatch({
      type: 'TOGGLE_SAVE',
      postId,
      currentUserId: currentUser._id,
      isSaved: isSaved
    });
  }
};

export const addComment = (postId, text) => {
  return (dispatch, getState) => {
    const {
      currentUser,
      token
    } = checkAuth(dispatch, getState);

    if (!currentUser) return;

    if (text === '') return;

    return apiPosts.addComment({postId, text, token})
      .then((body) =>
        dispatch({
          type: 'ADD_COMMENT',
          postId,
          comment: body.data.comment
        })
      )
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }
};

export const deleteComment = (postId, commentId) => {
  return (dispatch, getState) => {
    const {
      currentUser,
      token
    } = checkAuth(dispatch, getState);

    if (!currentUser) return;

    return apiPosts.deleteComment({postId, commentId, token})
      .then((body) =>
        dispatch({
          type: 'DELETE_COMMENT',
          postId,
          commentId
        })
      )
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }
};