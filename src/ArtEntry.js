import React from 'react';
import Grid from '@material-ui/core/Grid';

import ArtItem from "./ArtItem";
import DocEdit from "./DocEdit";
import DocField from "./DocField";
import DocCheckbox from "./DocCheckbox";

export default function ArtEntry(props) {

  return (
      <div>
        <Grid container direction="column" >
            <Grid container spacing={4} direction="row">
                <DocEdit document={`artists/${props.uid}`}>
                    <Grid container item spacing={1} xs={6}>
                        <Grid item xs={6}>
                            <DocField label="First Name" field="first" size={30}/>
                        </Grid> <br />
                        <Grid item xs={6}>
                            <DocField label="Last Name" field="last"  size={30}/>
                        </Grid>
                        <Grid item xs={6}>
                            <DocCheckbox label={"show\u00A0email\u00A0as\u00A0contact"} field="showEMail" />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <DocField label="Description" field="description" multiline={true} rows={4} rowsMax={4}/>

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
