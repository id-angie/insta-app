const user = (state = { user: null }, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        user: action.user
      };

    case 'SHOW_POSTS_LIST':
      return {
        ...state,
        user: {
          ...state.user,
          feed: action.feed
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
          feed: {
            ...state.user.feed,
            posts: state.user.feed.posts.map((post) => {
              if (post.id === action.postId) {
                return {
                  ...post,
                  feedback: {
                    ...post.feedback,
                    comments: post.feedback.comments.concat({
                      id: new Date() + ' ' + Math.random(),
                      commiter: action.currentUserId,
                      text: action.comment,
                      date: new Date(),
                      likes: 0
                    })
                  }
                }
              }
              return post;
            })
          }
        }
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        user: {
          ...state.user,
          feed: {
            ...state.user.feed,
            posts: state.user.feed.posts.map((post) => {
              if (post.id === action.postId) {
                return {
                  ...post,
                  feedback: {
                    ...post.feedback,
                    comments: post.feedback.comments.filter((comment) => {
                      return (comment.id !== action.commentId);
                    })
                  }
                }
              }
              return post;
            })
          }
        }
      };

    default:
      return state;
  }
}

export default user;