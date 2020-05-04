import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SignInOrOut from './auth/SignIn'
import SearchIcon from '@material-ui/icons/Search';
import Fade from '@material-ui/core/Fade';
import { IsAuth, useAuth } from './auth/ProvideAuth'
import MyArtEntry from './MyArtEntry'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: .1,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  space: {
    flexGrow: 2,
    display: 'none',
    "text-align": 'left',
    [theme.breakpoints.up('sm')]: {
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
    [theme.breakpoints.up('sm')]: {
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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [moved, setMoved] = React.useState(true);
  const clearTimer = React.useRef(undefined);
  const auth = useAuth();

  const setFadeTimer = () => {
    const timer = setTimeout(() => {
      setMoved(false);
    }, 5000);
    return () => clearTimeout(timer);
  }

  React.useEffect(() => {
      clearTimer.current = setFadeTimer();
  }, []);

  document.addEventListener('mousemove', (e) => {
      if (clearTimer.current) {
      	clearTimer.current();
      }
      clearTimer.current = setFadeTimer();
      setMoved(true);
  });

  return (
    <div className={classes.root}>
      <Fade in={moved} timeout={1000}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Twilight Park Art Show 2020
          </Typography>
          <Typography className={classes.title} variant="h6" noWrap>
            Gallery
          </Typography>
          <Typography className={classes.title} variant="h6" noWrap>
            Catalog
          </Typography>
          <Typography className={classes.space} variant="h6" noWrap>
          </Typography>
          <IsAuth><MyArtEntry email={auth && auth.user && auth.user.email}/><Box/></IsAuth>
          <SignInOrOut/>

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
        </Toolbar>
      </AppBar>
      </Fade>
    </div>
  );
}
