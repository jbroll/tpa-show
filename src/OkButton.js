
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: .1,
      "text-align": 'left',
      '&:hover': {
        background: "lightblue",
        borderRadius: "1em",
      }
    }, 
}));

export default function OkButton(props) {
  const classes = useStyles();
    return (
          <Button onClick={props.onClick} variant="outlined" color="primary" style={{ float: "right" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              OK
            </Typography>
          </Button>
    );
}