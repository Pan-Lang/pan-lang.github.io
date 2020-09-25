import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Order from './pages/Order';
import Stock from './pages/Stock';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Switch>
        <Route exact path="/">
          <h1>Welcome to PanLang!</h1>
        </Route>
        <Route path="/stock">
          <Stock />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
