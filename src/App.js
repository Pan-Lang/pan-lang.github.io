import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Order from './pages/Order';
import Stock from './pages/Stock';

function App() {
  return (
    <Router>
      <Navbar ç/>
      <br />
      <Switch>
        <Route exact path="/">
        <h1>Welcome to <font style={{color:'#26B020'}}>Pan-Lang</font>!</h1>
        </Route>
        <Route path="/stock">
          <Stock />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="*">
        <h1>Welcome to Pan-Lang!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
