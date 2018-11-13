const rootReducer = (state = { user: null, token: null, forceLogin: false }, action) => {
  // console.log(action);
  // console.log(state);
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
        token: action.token
      };

    case 'LOGOUT':
      return { user: null };

    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: action.updatedFollowing
        }
      };

    case 'REGISTRATION':
      return { user: action.user };

    case 'NEW_POST':
      alert(`added new post: ${action.file}.jpg with text: '${action.text}'`);
      return state;

    default:
      return state;
  }
}

export default rootReducer;