import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import RoutesComponent from './components/RoutesComponent';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path={`/`} component={RoutesComponent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
