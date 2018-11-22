const user = (state = { user: null }, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        user: {
          ...(state.user) || {},
          ...action.user,
          about: action.user.about || ''
        }
      };

    case 'SHOW_POSTS_LIST':
      return {
        ...state,
        user: {
          ...state.user,
          view: 'posts',
          feed: action.feed,
        }
      };

    case 'SHOW_EMPTY_LIST':
      return {
        ...state,
        user: {
          ...state.user,
          view: 'tagged',
          feed: []
        }
      };

    case 'SHOW_COMMENTS_LIST':
      return {
        ...state,
        user: {
          ...state.user,
          feed: state.user.feed.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                comments: action.comments
              }
            }
            return post;
          })
        }
      };

    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.isFollow ?
            state.user.followers.filter((user) => user !== action.currentUserId) :
            state.user.followers.concat(action.currentUserId)
        }
      };

    case 'TOGGLE_LIKE':
      return {
        ...state,
        user: {
          ...state.user,
          feed: state.user.feed.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                feedback: {
                  ...post.feedback,
                  likes: action.isLiked ?
                    post.feedback.likes.filter((user) => user !== action.currentUserId) :
                    post.feedback.likes.concat(action.currentUserId)
                }
              }
            }
            return post;
          })
        }
      };


    case 'TOGGLE_SAVE':
      return {
        ...state,
        user: {
          ...state.user,
          feed: state.user.feed.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                feedback: {
                  ...post.feedback,
                  saves: action.isSaved ?
                    post.feedback.saves.filter((user) => user !== action.currentUserId) :
                    post.feedback.saves.concat(action.currentUserId)
                }
              }
            }
            return post;
          })
        }
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        user: {
          ...state.user,
          feed: state.user.feed.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                feedback: {
                  ...post.feedback,
                  comments: post.feedback.comments + 1
                },
                comments: (post.comments || []).concat(
                  action.comment
                )
              }
            }
            return post;
          })
        }
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        user: {
          ...state.user,
          feed: state.user.feed.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                feedback: {
                  ...post.feedback,
                  comments: post.feedback.comments -1
                },
                comments: post.comments.filter((comment) =>
                  comment._id !== action.commentId
                )
              }
            }
            return post;
          })
        }
      };

    case 'DELETE_POST':
      return {
        ...state,
        user: {
          ...state.user,
          feed: state.user.feed.filter((post) =>
            (post._id !== action.postId)
          )
        }
      };

    default:
      return state;
  }
}

export default user;