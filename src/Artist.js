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
        margin: '0 auto',
        maxWidth: "400px",
        maxHeight: "400px"
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

  const entries = props.entries;
  const nx = Math.floor( Math.sqrt(entries.length));
  const tileSize = props.size/nx;

  return (
        <Grid direction="row" container>

            {entries.map((entry, i) => 
                <Grid key={entry.key} item container xs={12} md={6} >
                    <Grid direction="row" container>
                        <Grid item xs={3} md={5} ><Typography> {entry.title} </Typography></Grid>
                        <Grid item xs={3} md={2} ><Typography> {entry.media} </Typography></Grid>
                        <Grid item xs={3} md={2} ><Typography> {entry.height} x {entry.width} </Typography></Grid>
                        <Grid item xs={3} md={2} ><Typography> {entry.price} </Typography></Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <div style={{width: tileSize, height: tileSize}} className={classes.imageDiv}>
                            <ScaledImage  className={classes.img} src={entry.image} alt={entry.title}/>
                        </div>
                    </Grid>
                </Grid>
            )}
        </Grid>
  );
}
