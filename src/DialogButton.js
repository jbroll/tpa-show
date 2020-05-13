import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: .1,
      "text-align": 'left',
    },
}));

export default function DialogButton(props) {
    const classes = useStyles();
    return <Button onClick={props.onClick}>
        <Typography className={classes.title} variant="h6" noWrap>
            {props.children}
        </Typography>
    </Button>;
}