import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

import { IsAuth, useAuth } from './ProvideAuth'


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
    spacer: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('xs')]: {
        display: 'block',
      marginTop: "100%",
      },
    }
}));

function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/;
    return re.test(String(email).toUpperCase());
}

export default function SignInOrOut({ children }) {
    return (
          <IsAuth>
            <SignIn/>
            <SignOut/>
        </IsAuth>);
}

export function SignOut() {
    const classes = useStyles();
    const auth = useAuth();

    const handleClickSignOut = () => {
        auth.signout();
    }

    return <Link to="/" onClick={handleClickSignOut} style={{textDecoration: "none"}}>
                <Typography className={classes.title} variant="h6" noWrap>
                  Sign Out
                </Typography>
                </Link>;
}

export function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailOk, setEmailOk] = React.useState(false);
  const auth = useAuth();

  const aa = firebase.auth();

  // Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      "microsoft.com",
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none'
  };

  const handleClickSignIn = () => {
      auth.signin(email, password);
  }

  const handleClickSignUp = () => {
      auth.signup(email, password);
  }

  const handleClickReset = () => {
      auth.sendPasswordResetEmail(email);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailOk(validateEmail(email));
  };
    
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Link to="/" onClick={handleClickOpen} style={{textDecoration: "none"}}>
      <Typography className={classes.title} variant="h6" noWrap>
        Sign In
      </Typography>
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
           Registered artists can sign in and update their entries

            </DialogTitle>
        <DialogContent>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
