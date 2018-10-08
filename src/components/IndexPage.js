import React from 'react';

import Login from './login';
import Footer from './footer';

const IndexPage = (props) => (
  <div className="IndexPage">
    <Login setUser={props.setUser} />
    <Footer />
  </div>
);

export default IndexPage;