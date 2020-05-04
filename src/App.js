import React from 'react';
import './App.css';

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import SearchAppBar from './SearchAppBar';
import ProvideAuth from './auth/ProvideAuth';
import Gallery from './Gallery.js'
import DocCollection from './DocCollection.js';

const thisTheme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

const styles = {
    App: {
        height: "100vh",
        background: 'lightgreen',
    }
};

export default function App() {
  return (
    <ProvideAuth>
    <MuiThemeProvider theme={thisTheme}>
      <div className="App" style={styles.App}>
        <SearchAppBar position="static"></SearchAppBar>

        <DocCollection collection='entries'>
            { docs => (<Gallery docs={docs} />) }
        </DocCollection>
      </div>
    </MuiThemeProvider>
    </ProvideAuth>
  );
}