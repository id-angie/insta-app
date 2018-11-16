import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import Footer from './footer';
import { login, registration, newPost, editInfo } from '../actions/currentUser.js';

const IndexPage = (props) => {
  if (props.currentUser && !props.preventRedirect)
    return <Redirect to={`/user/${props.currentUser.nickname}`} />

  const { Component } = props;

  return (
    <div className="index-page">
      <Component
        currentUser={props.currentUser}
        login={props.login}
        registration={props.registration}
        newPost={props.newPost}
        editInfo={props.editInfo}
      />
      <Footer />
    </div>
  )
};

export default connect(
  (state) => ({
    currentUser: state.currentUser.user
  }),
  {
    login,
    registration,
    newPost,
    editInfo
  }
)(IndexPage);