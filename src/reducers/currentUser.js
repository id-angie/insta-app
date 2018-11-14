const currentUser = (state = { user: null, token: null, forceLogin: false }, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
        token: action.token
      };

    case 'LOGOUT':
      return { user: null };

    case 'REGISTRATION':
      return { user: action.user };

    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: action.updatedFollowing
        }
      };

    case 'NEW_POST':
      return state;

    default:
      return state;
  }
}

export default currentUser;