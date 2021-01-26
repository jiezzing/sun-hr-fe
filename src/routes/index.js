import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// components
import Login from '../pages/user/Login/Login';
import Attendance from '../pages/user/Attendance/Attendance';

const routes = () => {
  return (
    <Switch>
      <Route path="/user/login" exact component={Login} />
      <Route path="/user/attendance" exact component={Attendance} />
    </Switch>
  );
}

export default withRouter(routes);
