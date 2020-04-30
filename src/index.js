import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD2-wmpeQLRB5pUd_SH5xv-tZRIK1Y_FUY",
  authDomain: "tpa-show-2020.firebaseapp.com",
  databaseURL: "https://tpa-show-2020.firebaseio.com",
  projectId: "tpa-show-2020",
  storageBucket: "tpa-show-2020.appspot.com",
  messagingSenderId: "401825426363",
  appId: "1:401825426363:web:b8000f6a01ed756d7cb29e"
};

firebase.initializeApp(config);

const styles = {
    App: {
        height: "100vh"
    }
};


ReactDOM.render(
  <React.StrictMode>
    <App style={styles.App}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
