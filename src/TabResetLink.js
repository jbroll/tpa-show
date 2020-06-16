import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useAuth } from './ProvideAuth'

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

export function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/;
    return re.test(String(email).toUpperCase());
}

export default function TabResetLink() {
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
    
  if (auth.user) {
    return Redirect("/");
  }
  return (
    <div>
      <Container fixed>
      <br />
      <Typography className={classes.title} variant="h6" noWrap>
         You can request an email with a password reset link here:
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
            inputProps={{ size: 30 }}
          />
          </Box>
          </Box>
          <Button variant="contained" size="medium" className={classes.link} onClick={handleClickReset} >
            <Typography className={classes.title} variant="h6" noWrap>
               Reset Password
            </Typography>
          </Button>
          </Container>
    </div>
  );
}