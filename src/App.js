import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignInOrOut from './auth/SignIn'
import { IsAuth, useAuth } from './auth/ProvideAuth'
import ArtCatalog from './ArtCatalog'
import MyArtEntry from './MyArtEntry'
import { makeStyles } from '@material-ui/core/styles';

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import TabbedSearchAppBar from './TabbedSearchAppBar';
import ProvideAuth from './auth/ProvideAuth';
import Gallery from './Gallery.js'
import DocCollection from './DocCollection.js';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  space: {
    flexGrow: 2,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

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
  const classes = useStyles();
  const auth = useAuth();
  const [tab, setTab] = React.useState("Show");

  const handleClickShow = () => { setTab("Show"); }
  const handleClickGallery = () => { setTab("Gallery"); }
  const handleClickCatalog = () => { setTab("Catalog"); }

  return (
    <MuiThemeProvider theme={thisTheme}>
    <ProvideAuth>
      <div className="App" style={styles.App}>
        <TabbedSearchAppBar position="static">

          <Button onClick={handleClickShow}>
            <Typography className={classes.title} variant="h6" noWrap>
              Twilight Park Art Show 2020
            </Typography>
          </Button>
          <Button onClick={handleClickGallery}>
            <Typography className={classes.title} variant="h6" noWrap>
              Gallery
            </Typography>
          </Button>
          <Button onClick={handleClickCatalog}>
            <Typography className={classes.title} variant="h6" noWrap>
              Catalog
            </Typography>
          </Button>
          <Typography className={classes.space} variant="h6" noWrap>
          </Typography>
          <IsAuth><MyArtEntry email={auth && auth.user && auth.user.email}/><Box/></IsAuth>
          <SignInOrOut/>
        </TabbedSearchAppBar>

        {tab === "Show" ?
          <div>This is the show page</div>
          : null
        }
        {tab === "Gallery" ?
          <DocCollection collection='entries'>
              { docs => (<Gallery docs={docs} />) }
          </DocCollection>
          : null
        }
        {tab === "Catalog" ?
          <DocCollection collection='artists'>
              { docs => (<ArtCatalog docs={docs} />) }
          </DocCollection>
          : null
        }
      </div>
    </ProvideAuth>
    </MuiThemeProvider>
  );
}
