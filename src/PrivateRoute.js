import React from 'react';
import { Route, Navigate  } from 'react-router-dom';
import { auth } from './firebaseConfig';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = auth.currentUser;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Navigate 
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
