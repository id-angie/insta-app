import React from 'react';

import Login from './login';
import Footer from './footer';

const IndexPage = (props) => (
  <div className="IndexPage">
    <Login handleEnter={props.handleEnter} />
    <Footer />
  </div>
);

export default IndexPage;