import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Box from '@material-ui/core/Box';
import { useRouteMatch } from "react-router-dom";

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

export default function TabbedSearchAppBar(props) {
  const classes = useStyles();
  const [moved, setMoved] = React.useState(true);
  const clearTimer = React.useRef(undefined);

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

  const gallery=useRouteMatch("/gallery");
  const fadeIn = gallery == null || moved;
  const display = fadeIn ? "block" : "none";

  return (
    <div className={classes.root} >
      <Fade in={fade} timeout={1000}>
      <AppBar  position="static" style={{ display: display }}>
        <Toolbar>
          {props.children}

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
      </Fade>
    </div>
  );
}
