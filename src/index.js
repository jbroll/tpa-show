import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";
import 'firebase/analytics';

import fb_config from './fb_config.js'

firebase.initializeApp(fb_config);
firebase.analytics();

const styles = {
    App: {
        height: "100vh"
    }
};

window.addEventListener("dragover",function(e){
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e.preventDefault();
},false);

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
