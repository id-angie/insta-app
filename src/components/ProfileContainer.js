import { connect } from 'react-redux'

import { toggleFollow } from '../actions';
import ProfilePage from './ProfilePage.js';

const mapStateToProps = ( state, { match } ) => ({
  userId: match.params.nickname,
  currentUser: state.currentUser.user,
  isFollow:
  state.currentUser.user ?
    state.currentUser.user.following.some((userId) => userId === match.params.nickname) :
    false
});

const mapDispatchToProps = {
  toggleFollow: toggleFollow
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);