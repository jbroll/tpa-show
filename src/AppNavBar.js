import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import ConfirmRegistration from './ConfirmRegistration';
import { SignInOrOut } from './SignIn'
import { IsAuth, IsAdmin } from './ProvideAuth'
import IconLink from './IconLink'
import MyArtEntry from './MyArtEntry'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ListTwoToneIcon from '@material-ui/icons/ListTwoTone';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'inherit'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('xs')]: {
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    float: 'right',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function AppNavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <AppBar  color="default" position="static">
        <Toolbar>
            <IconLink to="/"        icon={HomeTwoToneIcon}          text="Twilight Park Art Show 2020" />
            <IconLink to="/gallery" icon={PhotoLibraryTwoToneIcon}  text="Gallery" />
            <IconLink to="/catalog" icon={ListTwoToneIcon}          text="Catalog" />
            <IsAdmin>
              <IconLink to="/users" icon={PeopleAltIcon}            text="Users" />
              <Box />
            </IsAdmin>
            <IsAuth>
              <Box />
              <ConfirmRegistration />
              <Box mr={2}><MyArtEntry onClose={props.onForceRender}/> </Box>
            </IsAuth>
            <SignInOrOut/>

{ /*
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
   */ }
        </Toolbar>
      </AppBar>
    </div>
  );
}
