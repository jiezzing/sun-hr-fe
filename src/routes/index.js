import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

// components
import Login from '../pages/user/Login/Login';
import Attendance from '../pages/user/Attendance/Attendance';

const routes = withRouter(({ history }) => {

  useEffect(() => {
    const cookies = new Cookies();

    const url = history.location.pathname + history.location.search;
    const cookie = cookies.get('access_token');
    let redirectTo = url;

    if (url.includes('/user') && cookie) {
      redirectTo = '/user/attendance';
    } else if (url.includes('/user') && !cookie) {
      redirectTo = '/user/login';
    }

    history.push(redirectTo);
  }, [])

  return (
    <Switch>
      <Route path="/user/login" exact component={Login} />
      <Route path="/user/attendance" exact component={Attendance} />
    </Switch>
  );
});

export default routes;
