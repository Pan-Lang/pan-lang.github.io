import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './pages/Home/';
import About from './pages/About';
import Order from './pages/Order';
import Stock from './pages/Stock';
import NavDrawer from './components/NavDrawer';
import OrderStock from './pages/OrderStock';
import OrderTracker from './pages/OrderTracker';
import SignIn from './pages/SignIn';
import Splash from './components/Splash';
import {
  ABOUT,
  ORDER_FORM,
  ORDER_TRACKER,
  LANDING,
  SIGN_IN,
  STOCK,
  ORDER_STOCK,
} from './constants/Routes';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

/**
 * Highest level App component for routing
 */
function App() {
  const [user, loading] = useAuthState(auth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (loading) {
    return <Splash loading={loading} />;
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div style={{ display: 'flex' }}>
        {/* Navigation bar on top of screen */}
        <Navbar
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          openDrawer={handleDrawerOpen}
          hasUser={Boolean(user)}
        />

        {/* Navigation drawer */}
        <NavDrawer
          open={drawerOpen}
          handleOpen={handleDrawerOpen}
          handleClose={handleDrawerClose}
        />

        {/* Routes */}
        <Switch>
          <Route exact path={LANDING}>
            <Home />
          </Route>
          <Route exact path={ABOUT}>
            <About />
          </Route>
          <Route path={STOCK}>
            <Stock />
          </Route>
          <Route path={ORDER_FORM}>
            <Order />
          </Route>
          <Route path={ORDER_STOCK}>
            <OrderStock />
          </Route>
          <Route path={ORDER_TRACKER}>
            <OrderTracker />
          </Route>
          <Route path={SIGN_IN}>
            <SignIn />
          </Route>
          <Route path="*">
            <h1>
              Welcome to <font style={{ color: '#26B020' }}>Pan-Lang</font>!
            </h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
