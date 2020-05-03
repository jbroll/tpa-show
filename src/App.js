import React from 'react';
import './App.css';
import DocGallery from './DocGallery.js'

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import SearchAppBar from './SearchAppBar';
import ProvideAuth from './auth/ProvideAuth';

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
        <DocGallery collection='entries' />
      </div>
    </MuiThemeProvider>
    </ProvideAuth>
  );
}