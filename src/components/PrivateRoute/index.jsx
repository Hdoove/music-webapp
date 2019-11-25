import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import WithMenu from '../../routes/WithMenu';

const PrivateRoute = ({ component: Component, user, ...props }) => {
  return (
    <Route
      {...props}
      render={thisprops => (
        // <WithMenu>
        <Component {...thisprops} />
        // </WithMenu>
      )}
    />
  );
};

const mapStatetoProps = state => ({ user: state.user });

export default connect(mapStatetoProps)(PrivateRoute);
