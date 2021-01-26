import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Trade from './Trade';
import TradeHistory from './TradeHistory';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/trade" exact component={Trade} />
        <Route path="/" exact component={TradeHistory} />
      </Switch>
    </Router>
  );
}

export default Routes;
