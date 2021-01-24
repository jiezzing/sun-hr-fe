import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// components
import Login from '../pages/users/Login/index';

const routes = () => {
  return (
    <Switch>
      <Route path="/users/login" exact component={Login} />
    </Switch>
  );
}

export default withRouter(routes);
