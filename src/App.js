import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Order from './pages/Order';
import Stock from './pages/Stock';

function App() {
  return (
    <Router>
      <NavigationBar />
      <br />
      <Switch>
        <Route exact path="/">
          <Home />
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
