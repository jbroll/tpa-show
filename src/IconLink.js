import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    iconSM: {
        color: "black",
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
      '&:hover': {
        background: "lightblue",
        borderRadius: 2,
      }
    },
    title: {
      color: "black",
      flexGrow: .1,
      display: 'block',
      padding: 2,
      "text-align": 'left',
      '&:hover': {
        background: "lightblue",
        borderRadius: "1em",
      }
    },
    titleMD: {
      color: "black",
      flexGrow: .1,
      display: 'none',
      padding: 2,
      "text-align": 'left',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
      '&:hover': {
        background: "lightblue",
        borderRadius: "1em",
      }
    },
}));

export default function IconLink(props) {
    const classes = useStyles();
    return <Link to={props.to} onClick={props.onClick} style={{textDecoration: "none"}}>
        { props.icon ? <Box m={2} mr={3} className={classes.iconSM}><props.icon /></Box> : null}

        <Box mr={2} className={props.icon ? classes.titleMD : classes.title} >
        <Typography className={classes.title} variant="h6" noWrap>
            {props.text}
        </Typography>
        </Box>
    </Link>;
}