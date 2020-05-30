import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    iconXS: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    iconSM: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    titleSM: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    titleMD: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
}));

export default function IconButton(props) {
    const classes = useStyles();
    return <Button onClick={props.onClick}>
        <Box className={classes.iconSM}><props.icon /></Box>
        <Typography className={classes.titleMD} variant="h6" noWrap>
            {props.text}
        </Typography>
    </Button>;
}