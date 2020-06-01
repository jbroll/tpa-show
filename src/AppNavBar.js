import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ListTwoToneIcon from '@material-ui/icons/ListTwoTone';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import IconLink from './IconLink'
import { IsAuth, IsAdmin } from './ProvideAuth'
import MyArtEntry from './MyArtEntry'
import TabConfirmReg from './TabConfirmReg';
import { SignInOrOut } from './SignIn'

/*
const useStyles = makeStyles((theme) => ({
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
*/

export default function AppNavBar(props) {
  //const classes = useStyles();

  return (
    <div>
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
              <TabConfirmReg />
              <Box mr={2}><MyArtEntry onClose={props.onForceRender}/> </Box>
            </IsAuth>
            <SignInOrOut/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
