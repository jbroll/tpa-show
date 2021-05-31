import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase/app"

import MailTo from './MailTo'
import ResetLinkAlert from './ResetLinkAlert';
import { useAuth } from './ProvideAuth'
import { validateEmail, uiConfig } from './SignIn';

const useStyles = makeStyles((theme) => ({
    title: {
      "text-align": 'left',
    },
    link: {
      color: 'black',
      background: 'lightblue',
    },
    textField: {
      width: 200,
    },
}));

const body = `
I'm interested in registering for the Twilight Park 2020 Online Art Show.  Here is my contact information:

Name:
EMail:

Mailing address:
  Street:
  City:
  State:
  ZIP:

  Thanks!!
`;

export function MailToTPA() {
    return <MailTo email="twilightartshow@gmail.com" subject="Online Art Show Registration Request" body={body} />;
}

export default function Welcome() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [emailOk, setEmailOk] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState("");
  const auth = useAuth();

  const handleClickReset = () => {
    auth.sendPasswordResetEmail(email).then(() => {
      setOpenDialog("SentOK");
    }).catch(e => { 
      setOpenDialog(e.code);
      });
  }

  const handleOnClose = () => {
    setOpenDialog("");
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailOk(validateEmail(email));
  };
    
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
        <MailToTPA/>
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
          <Button variant="contained" size="medium" className={classes.link} onClick={handleClickReset} >
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
                you will not have to remember a separate password for the art show.
            </Typography>
          </Box>
        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </Grid>
      </Container>
      <ResetLinkAlert type={openDialog} email={email} onClose={handleOnClose}  />
    </div>
  );
}

