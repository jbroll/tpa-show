import React from 'react';
import Grid from '@material-ui/core/Grid';

import ScaledImage from './ScaledImage';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    imageDiv: {
        position: 'relative',
        background: 'transparent',
        display: 'table',
        height: 800,
        width: 800,
        margin: '0 auto'
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        heigth: "100%",
        width: "100%"
    }
}));

export default function Artist(props) {
  const classes = useStyles();

  return (
    <div>
        {props.entry1 == null ? null : 
        <div>
        <Grid direction="row" container>

        <Grid item><Typography>
            {props.entry1.title}
        </Typography></Grid>

        <Grid item><Typography>
            {props.entry1.media} 
        </Typography></Grid>

        <Grid item><Typography>
            {props.entry1.height} x {props.entry1.width} 
        </Typography></Grid>
        <Grid item><Typography>
            {props.entry1.price}
        </Typography></Grid>
        </Grid>
        <div className={classes.imageDiv}>
            <ScaledImage className={classes.img} src={props.entry1.image} alt="Art Gallery"/>
        </div>
        </div>
        }
    </div>
  );
}
