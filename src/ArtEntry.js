import React from 'react';
import Grid from '@material-ui/core/Grid';

import ArtItem from "./ArtItem";
import DocEdit from "./DocEdit";
import DocField from "./DocField";

export default function ArtEntry(props) {

  return (
      <div>
        <Grid container direction="column" >
            <Grid container spacing={4} direction="row">
                <DocEdit document={`artists/${props.uid}`}>
                    <Grid item xs={6}>
                        <DocField label="First Name" field="first"/>
                    </Grid>
                    <Grid item xs={6}>
                        <DocField label="Last Name" field="last" />
                    </Grid>
                </DocEdit>
            </Grid>
            <Grid container direction="column">
                <ArtItem uid={props.uid} n={1} />
                <ArtItem uid={props.uid} n={2} />
            </Grid>
          </Grid>
    </div>
  );
}
