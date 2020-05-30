import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

import { IsAuth, useAuth } from './ProvideAuth'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import IconLink from './IconLink';

const useStyles = makeStyles((theme) => ({
    title: {
      color: "black",
      flexGrow: .1,
      display: 'block',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    textField: {
      width: 200,
    },
}));

export function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/;
    return re.test(String(email).toUpperCase());
}

export function SignInOrOut({ children }) {
    return (
          <IsAuth>
            <SignIn/>
            <SignOut/>
        </IsAuth>);
}

export function SignOut() {
    const auth = useAuth();

    const handleClickSignOut = () => {
        auth.signout();
    }

    return <IconLink to="/" onClick={handleClickSignOut} text="Sign Out" />;
}

export function SignIn() {
  return <IconLink to="/signIn" text="Sign In" />
}

// Configure FirebaseUI.
export const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    "microsoft.com",
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none'
};

export function SignInPage() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailOk, setEmailOk] = React.useState(false);
  const auth = useAuth();

  const handleClickSignIn = () => {
      auth.signin(email, password);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailOk(validateEmail(email));
  };
    
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (auth.user) {
    return Redirect("/");
  }
  return (
    <div>
      <Container fixed>
      <br />
      <Typography className={classes.title} variant="h6" noWrap>
         Participating Artist Sign In
      </Typography>
      <br />
      <br />
      <Typography className={classes.title} noWrap>
         Registered artists sign in to update show their entries
      </Typography>
      <br />
      <Box display="inline-block">
          <Box display="flex" justifyContent="flex-start" >
          <TextField
            onChange={handleEmailChange}
            error={!(email === "" || emailOk)}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            inputProps={{ size: 30 }}
          />
          </Box>
          <br />
          <Box mr={4} display="inline-flex" justifyContent="flex-start" >

          <TextField
            onChange={handlePasswordChange}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            inputProps={{ size: 30 }}
          />
          </Box>
          <Button variant="contained" color="primary" size="medium" onClick={handleClickSignIn} >
            <Typography className={classes.title} variant="h6" noWrap>
                Sign In
            </Typography>
          </Button>
        </Box>

        <br />
        <br />
        <Box pt={4} pb={2} fontWeight="fontWeightBold">
            <Typography className={classes.title} variant="body1" noWrap>
                Or Sign in through another service:
            </Typography>
          </Box>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          </Container>
    </div>
  );
}
