import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/App';
import Dashboard from './components/Dashboard';
import PersonList from './components/person/PersonList';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="persons" component={PersonList} />
  </Route>
);

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    {routes}
  </Router>,
  document.getElementById('app')
);
