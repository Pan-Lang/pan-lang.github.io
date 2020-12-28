import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Firebase, { FirebaseContext } from './components/Firebase';
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
     <React.StrictMode>
      <React.Fragment>
        <CssBaseline />
        <App />
      </React.Fragment>
    </React.StrictMode>
  </FirebaseContext.Provider>,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
