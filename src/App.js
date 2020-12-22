import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './pages/Home';
import About from './pages/About';
import Order from './pages/Order';
import Stock from './pages/Stock';
import OrderStock from './pages/OrderStock';
import OrderTracker from './pages/OrderTracker';
import Login from './pages/Login';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      {/* FIXME: naive fix for keeping a fixed navbar */}
      <div style={{ padding: 55 }} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/stock">
          <Stock />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/order-stock">
          <OrderStock />
        </Route>
        <Route path="/order-tracker"> 
          <OrderTracker />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <h1>
            Welcome to <font style={{ color: '#26B020' }}>Pan-Lang</font>!
          </h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
