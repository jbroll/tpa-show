import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import ConfirmRegistration from './ConfirmRegistration';
import Typography from '@material-ui/core/Typography';
import SignInOrOut from './auth/SignIn'
import { IsAuth, IsAdmin } from './auth/ProvideAuth'
import ArtCatalog from './ArtCatalog'
import UserData from './UserData'
import Users from './Users'
import IconLink from './IconLink'
import MyArtEntry from './MyArtEntry'
import { makeStyles } from '@material-ui/core/styles';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ListTwoToneIcon from '@material-ui/icons/ListTwoTone';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import TabbedSearchAppBar from './TabbedSearchAppBar';
import ProvideAuth from './auth/ProvideAuth';
import Gallery from './Gallery.js'
import DocCollection from './DocCollection.js';

const useStyles = makeStyles((theme) => ({
  space: {
    flexGrow: 2,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('xs')]: {
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

  document.title = "Art Show 2020";
  return (
    <MuiThemeProvider theme={thisTheme}>
    <ProvideAuth>
      <Router>

      <div className="App" style={styles.App}>
        <TabbedSearchAppBar position="static" >

          <IconLink to="/"        icon={HomeTwoToneIcon}          text="Twilight Park Art Show 2020" />
          <IconLink to="/gallery" icon={PhotoLibraryTwoToneIcon}  text="Gallery" />
          <IconLink to="/catalog" icon={ListTwoToneIcon}          text="Catalog" />
          <IsAdmin>
            <IconLink to="/users" icon={PeopleAltIcon}            text="Users" />
            <Box />
          </IsAdmin>
          <Typography className={classes.space} variant="h6" noWrap> </Typography>
          <IsAuth>
            <Box />
            <ConfirmRegistration />
            <Box mr={2}><MyArtEntry /> </Box>
           </IsAuth>
          <SignInOrOut/>
        </TabbedSearchAppBar>

        <Switch>
          <Route path="/gallery">
            <DocCollection collections={['entries']}>
                { collections => (<Gallery entries={collections['entries']} />) }
            </DocCollection>
          </Route>
          <Route path="/catalog">
            <DocCollection collections={['artists', 'entries']}>
                { collections => (<ArtCatalog collections={collections} />) }
            </DocCollection>
          </Route>
          <Route path="/users">
            <UserData>
                { props => (<Users {...props} />) }
            </UserData>
          </Route>
          <Route path="/signedIn">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            <div>
              <p>
                <b>Twilight Park Artists</b> Online Art Show 2020
                </p>
                <Link to="gallery" >
                <Typography className={classes.title} variant="h6" noWrap>
                  View the Gallery
                </Typography>
              </Link>
              <p>
              We are all finding new ways to continue our work and hobbies during the i
              coronavirus pandemic of 2020.  Since the Twilight Park Art Show is such a 
              special event for us, we have decided to hold a virtual art show. i
              We will miss seeing all of our friends this summer, but we want to support 
              the artists and keep the spirit of the show strong for when we return to the club house.
              </p>
              
              <p>
              Artists are invited to participate by uploading images of their works. Please 
              contact us here, if you would like to participate and have not received an 
              invitation. You may sell your pieces by including direct contact information. 
              We will not be handling sales, and we will not be charging any commissions. 
              You are an important part of our community, and we want to support you during 
              these difficult times.
              </p>
              
              <p>
              The virtual show will be live on August 1, 2020. Please share this with your 
              fellow artists and art patrons.
              </p>
            </div>
          </Route>
        </Switch>
      </div>
      </Router>
    </ProvideAuth>
    </MuiThemeProvider>
  );
}
