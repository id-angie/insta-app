export const toggleFollow = (userId, isFollow) => {
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

    if (isFollow === false || window.confirm("Отписаться?")) {
      dispatch({
        type: 'TOGGLE_FOLLOW',
        updatedFollowing: isFollow ?
          currentUser.following.filter((user) => user !== userId) :
          currentUser.following.concat(userId)
      });
    }
  }
};