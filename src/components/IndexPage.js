import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Footer from './footer';

const IndexPage = (props) => {
  if (props.currentUser && !props.preventRedirect)
    return <Redirect to={`/user/${props.currentUser.nickname}`} />

  const { Component } = props;

  return (
    <div className="index-page">
      <Component />
      <Footer />
    </div>
  )
};

export default connect(
  (state) => ({
    currentUser: state.currentUser.user
  })
)(IndexPage);