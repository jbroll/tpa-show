import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignInOrOut from './auth/SignIn'
import { IsAuth } from './auth/ProvideAuth'
import ArtCatalog from './ArtCatalog'
import MyArtEntry from './MyArtEntry'
import { makeStyles } from '@material-ui/core/styles';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ListTwoToneIcon from '@material-ui/icons/ListTwoTone';

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import TabbedSearchAppBar from './TabbedSearchAppBar';
import ProvideAuth from './auth/ProvideAuth';
import Gallery from './Gallery.js'
import DocCollection from './DocCollection.js';

const useStyles = makeStyles((theme) => ({
  iconXS: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  iconSM: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  titleSM: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleMD: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
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
  const [tab, setTab] = React.useState("Show");

  const handleClickShow = () => { setTab("Show"); }
  const handleClickGallery = () => { setTab("Gallery"); }
  const handleClickCatalog = () => { setTab("Catalog"); }

  document.title = "Art Show 2020";
  return (
    <MuiThemeProvider theme={thisTheme}>
    <ProvideAuth>
      <div className="App" style={styles.App}>
        <TabbedSearchAppBar position="static">

          <Button onClick={handleClickShow}>
            <Box className={classes.iconSM}><HomeTwoToneIcon/></Box>
            <Typography className={classes.titleMD} variant="h6" noWrap>
              Twilight Park Art Show 2020
            </Typography>
          </Button>
          <Button onClick={handleClickGallery}>
            <Box className={classes.iconXS}><PhotoLibraryTwoToneIcon/></Box>
            <Typography className={classes.titleSM} variant="h6" noWrap>
              Gallery
            </Typography>
          </Button>
          <Button onClick={handleClickCatalog}>
            <Box className={classes.iconXS}><ListTwoToneIcon/></Box>
            <Typography className={classes.titleSM} variant="h6" noWrap>
              Catalog
            </Typography>
          </Button>
          <Typography className={classes.space} variant="h6" noWrap>
          </Typography>
          <IsAuth><MyArtEntry /><Box /></IsAuth>
          <SignInOrOut/>
        </TabbedSearchAppBar>

        {tab === "Show" ?
          <div>
            <p>
              Twilight Park Artists 2020
            </p>
            <p>
          Virtual Art Show
            </p>
            <Button onClick={handleClickGallery}>
            <Typography className={classes.title} variant="h6" noWrap>
              View the Gallery
            </Typography>
          </Button>
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
          : null
        }
        {tab === "Gallery" ?
          <DocCollection collections={['entries']}>
              { collections => (<Gallery entries={collections['entries']} />) }
          </DocCollection>
          : null
        }
        {tab === "Catalog" ?
          <DocCollection collections={['artists', 'entries']}>
              { collections => (<ArtCatalog collections={collections} />) }
          </DocCollection>
          : null
        }
      </div>
    </ProvideAuth>
    </MuiThemeProvider>
  );
}
