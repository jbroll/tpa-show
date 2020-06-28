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
import TabConfig from './TabConfig.js'
import UserData from './UserData'
import Users from './Users'
import { SignInPage } from './SignIn'
import ProvideAuth from './ProvideAuth';
import { IsAdmin, useAuth } from './ProvideAuth'
import { useConfig } from "./DocConfig";
import TabPrivacy from './TabPrivacy';
import TabTOS from './TabTOS';
import TabShowTOS from './TabShowTOS';
import TabResetLink from './TabResetLink';

const thisTheme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

const styles = {
    App: {
        minHeight: "100vh",
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

  const uidFilter = (id, doc, collection) => {
      if (collection === 'artists') {
        if(doc.first == null || doc.first === "" ) { return false; }
        if(doc.last == null || doc.last === "" ) { return false; }
      }
      if (collection === 'entries') {
        if(doc.title == null || doc.title === "" ) { return false; }
        if(doc.image == null || doc.image === "" ) { return false; }
      }

      if (config.value.showIsEmpty) { return false; }
      if (config.value.showIsOpen) { return true; }

      if (config.value.showAll && auth.claims.adm) { return true; }

      if (auth && auth.claims && auth.claims.reg && id.startsWith(auth.user.uid)) { return true; }

      return false;
  }

  var collections;
  if (config.value.showIsOpen || (auth && auth.claims && auth.claims.adm && config.value.showSaved)) {
    collections=['config/artists', 'config/entries'];
  } else {
    collections=['artists', 'entries'];
  }

  const uid = auth.user.uid;
  const uidShow = !config.value.showIsOpen && auth.user && auth.claims.reg;
  const uidAdmin = !(config.value.showAll && auth.claims.adm);
  const uidOnly = uidShow && uidAdmin;

  const a_where = [];
  if (uidOnly) {
    a_where.push(["__name__", "==", uid]);
  } else {
      a_where.push(["last", "!=", null]);
  }


  const e_where = [];
  if (uidOnly) {
    e_where.push(["__name__", "in", [uid + "-1", uid + "-2"]]);
  } else {
      e_where.push(["title", "!=", null]);
    }
  const where = {
    artists: a_where,
    entries: e_where,
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
              <DocCollection key='gallery' collections={collections} where={where} filter={uidFilter}>
                  { collections => (
                    <ArtGallery 
                      collections={collections} 
                      onForceRender={forceRender}/>) }
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
              <DocCollection key='catalog' collections={collections} where={where} filter={uidFilter}>
                  { collections => ( <ArtCatalog collections={collections} />) }
              </DocCollection> :
              <TabShowIsClosed />
            }
          </Route>
          <Route path="/config">
            <IsAdmin>
              <DocCollection key='gallery' collections={['artists', 'entries']} where={where} filter={uidFilter}>
                  { collections => ( <TabConfig collections={collections} /> ) }
              </DocCollection>
              <Redirect to="/" />
            </IsAdmin>
          </Route>
          <Route path="/users">
            <IsAdmin>
              <UserData>
                  { props => (<Users 
                  {...props} />) }
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
          <Route path="/reset-link">
            <TabResetLink />
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
