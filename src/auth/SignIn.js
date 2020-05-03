
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
import { IsAuth, useAuth } from './ProvideAuth'


const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    spacer: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
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
            <SignOut/>
            <SignIn/>
        </IsAuth>);
}

export function SignOut() {
    const classes = useStyles();
    const auth = useAuth();

    const handleClickSignOut = () => {
        auth.signout();
    }

    return <Button variant="outlined" onClick={handleClickSignOut}>
      <Typography className={classes.title} variant="h6" noWrap>
        Sign Out
      </Typography>
      </Button>;
}

export function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailOk, setEmailOk] = React.useState(false);
  const auth = useAuth();

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
      <Button variant="outlined" onClick={handleClickOpen}>
      <Typography className={classes.title} variant="h6" noWrap>
        Sign In
      </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Registered artists can sign in to update their art show entries.
          </DialogContentText>
          <TextField
            onChange={handleEmailChange}
            error={!(email === "" || emailOk)}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={handlePasswordChange}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          <Typography className={classes.title} variant="body1" noWrap>
            <Box pt={4} pb={2} fontWeight="fontWeightBold">
              Or Sign in through another service:
            </Box>
          </Typography>
          <Typography className={classes.title} variant="body1" noWrap>
          </Typography>
          <Table padding={"none"} size={"small"}>
            <TableBody>
            <TableRow>
            <TableCell style={{width: "100%"}}>
                <Button style={{width: "100%"}} variant="outlined" onClick={handleClickOpen}> 
                    <Typography className={classes.title} variant="body1" noWrap>
                        Sign in with Facebook
                    </Typography>
                </Button>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell style={{width: "100%"}}>
                <Button style={{width: "100%"}} variant="outlined" onClick={handleClickOpen}> 
                    <Typography className={classes.title} variant="body1" noWrap>
                        Sign in with Google
                    </Typography>
                </Button>
            </TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={!emailOk} onClick={handleClickReset} color="primary">
            Reset Password
          </Button>
          <Button disabled={!emailOk || password === ""} onClick={handleClickSignUp} color="primary">
            Register
          </Button>
          <Button disabled={!emailOk || password === ""} onClick={handleClickSignIn} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
