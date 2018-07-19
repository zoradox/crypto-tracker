import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticateComponent from './AuthenticateComponent';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import DashboardComponent from './DashboardComponent';

class RoutesComponent extends React.Component {
  render () {
    return (
      <Fragment>
        <Switch>
          <AuthenticateComponent exact path='/dashboard' component={DashboardComponent} />
          <Route exact path='/signup' component={SignupComponent} />
          <Route exact path='/' component={LoginComponent} />
        </Switch>
      </Fragment>
    );
  }
};

export default RoutesComponent;
