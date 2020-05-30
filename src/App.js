import React from 'react';
import './App.css';
import TabWelcome from './TabWelcome.js'
import ArtCatalog from './ArtCatalog'
import UserData from './UserData'
import Users from './Users'
import {Helmet} from "react-helmet";
import { SignInPage } from './SignIn'
import { IsAdmin, useAuth } from './ProvideAuth'
import { useConfig } from "./DocConfig";
import grey from '@material-ui/core/colors/grey';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useRouteMatch,
} from "react-router-dom";

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import AppNavBar from './AppNavBar';
import ProvideAuth from './ProvideAuth';
import ArtGallery from './ArtGallery'
import DocCollection from './DocCollection';
import DocConfig from './DocConfig';
import TabMainPage from './TabMainPage';

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
        background: grey[200],
    }
};

function AppTabRoutes() {
  const [x, setX] = React.useState(1);

  const forceRender = () => {
    setX(Math.random());
  }

  const auth = useAuth();
  const config = useConfig(); 

  const uidFilter = (id, doc) => {
      if (config.value.showIsOpen) { return true; }

      if (auth && auth.claims && auth.claims.reg && id.startsWith(auth.user.uid)) { return true; }

      return false;
  }

  return (
      <div className="App" style={styles.App}>
        <Helmet>
          <title>Art Show 2020</title>
          <meta name="description" content="Twilight Park Artists Online Art Show - 2020" />
        </Helmet>

        { useRouteMatch("/gallery") ? null :
          <AppNavBar position="static" onForceRender={forceRender} />
        }

        <Switch>
          <Route key={x} path="/gallery">
            <Helmet>
              <title>Image Gallery</title>
              <meta name="description" 
                    content="A slide show of images submitted by participating artists" />
            </Helmet>
            <DocCollection key='gallery' collections={['artists', 'entries']} filter={uidFilter}>
                { collections => (<ArtGallery collections={collections} onForceRender={forceRender}/>) }
            </DocCollection>
          </Route>
          <Route key={x} path="/catalog">
            <Helmet>
              <title>Catalog of Entries</title>
              <meta name="description" 
                    content="A catalog of art show entries with links ot artist's pages and individual show entries" />
            </Helmet>
            <DocCollection key='catalog' collections={['artists', 'entries']} filter={uidFilter}>
                { collections => (<ArtCatalog collections={collections} />) }
            </DocCollection>
          </Route>
            <Route path="/users">
            <IsAdmin>
              <UserData>
                  { props => (<Users {...props} />) }
              </UserData>
              <Redirect to="/" />
            </IsAdmin>
          </Route>
          <Route path="/welcome">
            <TabWelcome />
          </Route>
          <Route path="/signIn">
            <SignInPage />
          </Route>
          <Route path="/signedIn">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            <TabMainPage />
          </Route>
        </Switch>
      </div>

  );
}
export default function App() {
  return (
    <MuiThemeProvider theme={thisTheme}>
    <ProvideAuth>
      <DocConfig document="config/tpa-2020">
        <Router>
          <AppTabRoutes />
        </Router>
      </DocConfig>
    </ProvideAuth>
    </MuiThemeProvider>
  );
}
