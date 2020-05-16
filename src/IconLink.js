import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    iconXS: {
        color: "black",
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    iconSM: {
        color: "black",
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    titleSM: {
        color: "black",
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    titleMD: {
        color: "black",
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
}));

export default function IconLink(props) {
    const classes = useStyles();
    return <Link to={props.to} style={{textDecoration: "none"}}>
        <Box m={1} mr={3} className={classes.iconSM}><props.icon /></Box>
        <Box mr={3}className={classes.titleMD} >

        <Typography className={classes.titleMD} variant="h6" noWrap>
            {props.text}
        </Typography>
        </Box>
    </Link>;
}