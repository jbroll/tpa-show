import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DocEdit from "./DocEdit";
import DocField from "./DocField";

const useStyles = makeStyles((theme) => ({
    image: {
        width: 175,
        height: 175,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    divStyle: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10
    },
    imageBox: {
      margin: 0
    },
}));

export default function ArtItem(props) {
  const classes = useStyles();

  const document = `entries/${props.email}!${props.n}`

  return <div className = {classes.divStyle}>
           <Grid item xs={4} className={classes.imageBox}>
               <Button className={classes.image}>
                 <img className={classes.img} src="HainesFallsClove.jpg" alt="Drop Image Here"/>
               </Button>
           </Grid>
           <Grid container spacing={4} direction="row">
            <DocEdit document={document}>
                <Grid item xs={12}>
                <DocField label="Title" field="title" />
                </Grid>
                <Grid item xs={3}>
                <DocField label="Title" field="title" />
                </Grid>
                <Grid item xs={3}>
                <DocField label="Height" field="height" />
                </Grid>
                <Grid item xs={3}>
                <DocField label="Width" field="width" />
                </Grid>
                <Grid item xs={3}>
                <DocField label="Price" field="price" />
                </Grid>
            </DocEdit>
           </Grid>
         </div>;
}
