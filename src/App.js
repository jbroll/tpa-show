import React from 'react';
import {Helmet} from "react-helmet";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useRouteMatch,
} from "react-router-dom";

import './App.css';
import AppNavBar from './AppNavBar';
import ArtCatalog from './ArtCatalog'
import ArtGallery from './ArtGallery'
import DocCollection from './DocCollection';
import DocConfig from './DocConfig';
import TabMainPage from './TabMainPage';
import TabInstructions from './TabInstructions';
import TabShowIsClosed from './TabShowIsClosed';
import TabWelcome from './TabWelcome.js'
import UserData from './UserData'
import Users from './Users'
import { SignInPage } from './SignIn'
import ProvideAuth from './ProvideAuth';
import { IsAdmin, useAuth } from './ProvideAuth'
import { useConfig } from "./DocConfig";
import TabPrivacy from './TabPrivacy';
import TabTOS from './TabTOS';
import TabShowTOS from './TabShowTOS';

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
      if (config.value.showIsEmpty) { return false; }
      if (config.value.showIsOpen) { return true; }

      if (config.value.showAll && auth.claims.adm) { return true; }

      if (auth && auth.claims && auth.claims.reg && id.startsWith(auth.user.uid)) { return true; }

      return false;
  }

  const showGalleryAndCatalog = config.value.showIsOpen || (auth.claims && auth.claims.reg);

  return (
      <div className="App" style={styles.App}>
        <Helmet>
          <title>Art Show 2020</title>
          <meta name="description" content="Twilight Park Artists Online Art Show - 2020" />
        </Helmet>

        { useRouteMatch("/gallery") && showGalleryAndCatalog ? null :
          <AppNavBar position="static" onForceRender={forceRender} />
        }

        <Switch>
          <Route key={x} path="/gallery">
            <Helmet>
              <title>Image Gallery</title>
              <meta name="description" 
                    content="A slide show of images submitted by participating artists" />
            </Helmet>
            { showGalleryAndCatalog ?
              <DocCollection key='gallery' collections={['artists', 'entries']} filter={uidFilter}>
                  { collections => (<ArtGallery collections={collections} onForceRender={forceRender}/>) }
              </DocCollection> :
              <TabShowIsClosed />
            }
          </Route>
          <Route key={x} path="/catalog">
            <Helmet>
              <title>Catalog of Entries</title>
              <meta name="description" 
                    content="A catalog of art show entries with links ot artist's pages and individual show entries" />
            </Helmet>
            { showGalleryAndCatalog ?
              <DocCollection key='catalog' collections={['artists', 'entries']} filter={uidFilter}>
                  { collections => (<ArtCatalog collections={collections} />) }
              </DocCollection> :
              <TabShowIsClosed />
            }
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
          <Route path="/instructions">
            <TabInstructions />
          </Route>
          <Route path="/signIn">
            <SignInPage />
          </Route>
          <Route path="/signedIn">
            <Redirect to="/" />
          </Route>
          <Route path="/show-tos">
            <TabShowTOS />
          </Route>
          <Route path="/terms-of-service">
            <TabTOS />
          </Route>
          <Route path="/privacy-policy">
            <TabPrivacy />
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
