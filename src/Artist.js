import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MailTo from './MailTo';
import ScaledImage from './ScaledImage';

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
  const artist = entries[0].artist;

  const wrapContact = (email) => {
    return (
        <span>
            Contact Artist&ensp;
                <MailTo email={email} 
                    subject="Art Work Refferal from Twilight Park Art Show 2020" 
                    body={`
${artist.first} ${artist.last}, 

I saw you work in the Twilight Park Online Art Show and I'm interest in knowing more.
`}
                />
        </span>
    );
  }

  const wrapWebSite = (wsite) => {
    if (!wsite.startsWith("http://")) {
        wsite = "http://" + wsite;
    }

    return (
        <span>
            Visit Artist Web Site <a href={wsite} >{wsite}</a>
        </span>
    )
  }
  const maybeItem = (wrap, value, width) => {
      if (value == null || value === "") {
          return null;
      }
      return (
            <Grid item sx={12} md={width}>
                <Typography variant="h6">
                    {wrap == null ? value : wrap(value) }
                </Typography>
            </Grid>
      );
  }

  return (
        <Grid direction="column" container spacing={1}>
            <Grid direction="row" item container spacing={1}>
                {maybeItem(null, artist.description, 12)}
                {maybeItem(wrapContact, artist.email, 6)}
                {maybeItem(wrapWebSite, artist.url, 6)}
            </Grid>
            <Grid direction="row" item container spacing={0}>
                {entries.map((entry, i) => 
                    <Grid key={entry.key} item container xs={12} md={6} >
                        <Grid direction="row" item container>
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
        </Grid>
  );
}
