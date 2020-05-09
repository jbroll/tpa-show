import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DocImage from "./DocImage";
import DocEdit from "./DocEdit";
import DocField from "./DocField";

const useStyles = makeStyles((theme) => ({
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

  const document = `entries/${props.uid}-${props.n}`
  const image = `${props.uid}-${props.n}`

  return <div className = {classes.divStyle}>
    <DocEdit document={document}>
        <Grid item xs={6} sm={4} className={classes.imageBox}>
            <DocImage field="image" image={image} />
        </Grid>
        <Grid container spacing={4} direction="row">
            <Grid item xs={12}>
                <DocField label="Title" field="title" />
            </Grid>
            <Grid item xs={6} sm={3}>
                <DocField label="Media" field="media" />
            </Grid>
            <Grid item xs={6} sm={3}>
                <DocField label="Height" field="height" />
            </Grid>
            <Grid item xs={6} sm={3}>
                <DocField label="Width" field="width" />
            </Grid>
            <Grid item xs={6} sm={3}>
                <DocField label="Price" field="price" />
            </Grid>
        </Grid>
    </DocEdit>
    </div>;
}
