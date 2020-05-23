import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from "firebase/app";
import "firebase/auth";

import { useAuth } from './ProvideAuth'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { validateEmail, uiConfig } from './SignIn';

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
    },
    textField: {
      width: 200,
    },
}));

export default function Welcome() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [emailOk, setEmailOk] = React.useState(false);
  const auth = useAuth();

  const handleClickReset = () => {
    auth.sendPasswordResetEmail(email).then(() => {
      alert(`An email with a reset password link has been set to ${email}`)
    });
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailOk(validateEmail(email));
  };
    
    const body = encodeURI(
`
I'm interested in registering for the Twilight Park 2020 Online Art Show.  Here is my contact information:

Name:
Mailing address:
EMail:

  Thanks!!
  `)

  return (
    <div>
      <Container fixed>
      <Grid item md={8}>

      <br />
      <Typography className={classes.title} variant="h6" noWrap>
         Welcome Participating Artists!!
      </Typography>
      <br />
      <br />
      <Typography className={classes.title} >
        If you received our email invitation to participate in this years online show you should enter your 
        email address below and click "Reset Password".  You will be sent a reset password link which you can
        use to set an initial password and then use the normal "Sign In" menu option in the top right.  If you 
        did not receive an invitation please request one by sending an email to&ensp;
          <a target="_top"
                rel="noopener noreferrer"
                href={`mailto:twilightartshow@gmail.com?subject=Online Art Show Registration Request&body=${body}`} >
            twilightartshow@gmail.com
          </a>
      </Typography>
      <br />
      <Box display="inline-block">
          <Box mr={4} display="inline-flex" justifyContent="flex-start" >
          <TextField
            onChange={handleEmailChange}
            error={!(email === "" || emailOk)}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            size="medium"
            inputProps={{ size: 30 }}
          />
          </Box>
          <Button variant="contained" color="primary" size="medium" onClick={handleClickReset} >
            <Typography className={classes.title} variant="h6" noWrap>
               Reset Password
            </Typography>
          </Button>
        </Box>

        <br />
        <br />
        <Box pt={4} pb={2} fontWeight="fontWeightBold">
            <Typography className={classes.title} variant="body1" >
                If the email where you received your Art Show invitation is also being used
                for one of your sociel media accounts you can sign in via that provider and 
                yuo will not have to remember a separate password for the art show.
            </Typography>
          </Box>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </Grid>
          </Container>
    </div>
  );
}

