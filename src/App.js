import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ConfirmRegistration from './ConfirmRegistration';
import Typography from '@material-ui/core/Typography';
import { SignInOrOut, SignInPage } from './SignIn'
import Welcome from './Welcome.js'
import { IsAuth, IsAdmin } from './ProvideAuth'
import ArtCatalog from './ArtCatalog'
import UserData from './UserData'
import Users from './Users'
import IconLink from './IconLink'
import MyArtEntry from './MyArtEntry'
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import grey from '@material-ui/core/colors/grey';

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
import ProvideAuth from './ProvideAuth';
import Gallery from './Gallery.js'
import DocCollection from './DocCollection.js';
import DocConfig from './DocConfig.js';

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
        background: grey[200],
    }
};

export default function App() {
  const classes = useStyles();
  const [x, setX] = React.useState(1);

  const forceRender = () => {
    setX(Math.random());
  }

  return (
    <MuiThemeProvider theme={thisTheme}>
    <ProvideAuth>
      <DocConfig document="config/tpa-2020">

      <Router>

      <div className="App" style={styles.App}>
        <Helmet>
          <title>Art Show 2020</title>
          <meta name="description" content="Twilight Park Artists Online Art Show - 2020" />
        </Helmet>
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
            <Box mr={2}><MyArtEntry onClose={forceRender}/> </Box>
           </IsAuth>
          <SignInOrOut/>
        </TabbedSearchAppBar>

        <Switch>
          <Route key={x} path="/gallery">
            <Helmet>
              <title>Image Gallery</title>
              <meta name="description" 
                    content="A slide show of images submitted by participating artists" />
            </Helmet>
            <DocCollection key='gallery' collections={['entries']}>
                { collections => (<Gallery entries={collections['entries']} />) }
            </DocCollection>
          </Route>
          <Route key={x} path="/catalog">
            <Helmet>
              <title>Catalog of Entries</title>
              <meta name="description" 
                    content="A catalog of art show entries with links ot artist's pages and individual show entries" />
            </Helmet>
            <DocCollection key='catalog' collections={['artists', 'entries']}>
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
            <Welcome />
          </Route>
          <Route path="/signIn">
            <SignInPage />
          </Route>
          <Route path="/signedIn">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            <Container fixed>
            <br />
            <br />
            <Grid container direction="row">

            <Grid md={6} item>
              <Typography className={classes.title} >
                  <b>Twilight Park Artists</b> Online Art Show 2020
              </Typography>
              <p>
              We will miss seeing all of our friends this summer, but we want to support 
              the artists and keep the spirit of the show strong for when we return to the club house.
              </p>
              <p>
                Artists are invited to participate by uploading images of their works. 
                If you have already received an email invitation to participate, please proceed to 
                the <Link to="/welcome" >Welcome</Link> page to obtain your Art Show password.  
              </p>
              <p>
              The show will be live on August 1, 2020. Please share this with your 
              fellow artists and art patrons.
              </p>
            </Grid>
            <Grid md={6} height="100%" item>
                <Link to="gallery" >
                <Typography className={classes.title} variant="h6" noWrap>
                  View the Gallery
                </Typography>
              </Link>
            </Grid>
            </Grid>
            </Container>
          </Route>
        </Switch>
      </div>
      </Router>
      </DocConfig>
    </ProvideAuth>
    </MuiThemeProvider>
  );
}
