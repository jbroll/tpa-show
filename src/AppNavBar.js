import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ListTwoToneIcon from '@material-ui/icons/ListTwoTone';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EditIcon from '@material-ui/icons/Edit';

import IconLink from './IconLink'
import { IsAuth, IsAdmin } from './ProvideAuth'
import MyArtEntry from './MyArtEntry'
import TabConfirmReg from './TabConfirmReg';
import { SignInOrOut } from './SignIn'
import { useConfig } from "./DocConfig";

export default function AppNavBar(props) {

  const config = useConfig(); 
  return (
    <div>
      <AppBar  color="default" position="static">
        <Toolbar>
            <IconLink to="/"        icon={HomeTwoToneIcon}          text="Twilight Park Art Show 2021" />
            <IconLink to="/gallery" icon={PhotoLibraryTwoToneIcon}  text="Gallery" />
            <IconLink to="/catalog" icon={ListTwoToneIcon}          text="Catalog" />
            <IsAdmin>
              <IconLink to="/config" icon={PeopleAltIcon}            text="Config" />
              <Box />
            </IsAdmin>
            <IsAdmin>
              <IconLink to="/users" icon={EditIcon}            text="Users" />
              <Box />
            </IsAdmin>
            {config.value.allowEntries ? 
              <IsAuth>
                <Box />
                <TabConfirmReg />
                <Box mr={2}><MyArtEntry onClose={props.onForceRender}/> </Box>
              </IsAuth> : null
            }
            <SignInOrOut/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
