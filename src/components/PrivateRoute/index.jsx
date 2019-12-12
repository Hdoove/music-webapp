import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...props }) => {
  return (
    <Route
      {...props}
      render={thisprops => (
        <Component {...thisprops} />
      )}
    />
  );
};

const mapStatetoProps = state => ({ user: state.user });

export default connect(mapStatetoProps)(PrivateRoute);
