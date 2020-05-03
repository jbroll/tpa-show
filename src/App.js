import React from 'react';
import './App.css';

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
        backgroundImage: "url(HainesFallsClove.jpg)",
        backgroundSize: "cover"
    }
};

function App() {
  return (
    <ProvideAuth>
    <MuiThemeProvider theme={thisTheme}>
      <div className="App" style={styles.App}>
        <SearchAppBar position="static"></SearchAppBar>
      </div>
    </MuiThemeProvider>
    </ProvideAuth>
  );
}

export default App;
