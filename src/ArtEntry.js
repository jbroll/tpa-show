import React from 'react';
import Grid from '@material-ui/core/Grid';

import ArtItem from "./ArtItem";
import DocEdit from "./DocEdit";
import DocField from "./DocField";
import DocCheckbox from "./DocCheckbox";
import { useAuth } from './ProvideAuth';

export default function ArtEntry(props) {

    const auth = useAuth();

    const handleEMailSave = (field, checked, doc) => {
        doc.fieldSave("email", checked ? auth.user.email : "");
    }

    return (
        <div>
          <Grid container direction="column" >
            <DocEdit document={`artists/${props.uid}`}>
                <Grid container spacing={4} direction="row">
                    <Grid container item spacing={1} xs={12} md={6}>
                        <Grid item xs={6}>
                            <DocField label="First Name" field="first" size={30}/>
                        </Grid> <br />
                        <Grid item xs={6}>
                            <DocField label="Last Name" field="last"  size={30}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DocCheckbox label={"show\u00A0email\u00A0as\u00A0contact"} field="showEMail" 
                                onSave={handleEMailSave} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DocField label="Web Site" field="url" size={80}/>
                        </Grid> <br />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DocField label="Artist Description" field="description" multiline={true} rows={7} rowsMax={7}/>

                    </Grid>
                </Grid>
            </DocEdit>
            <Grid container direction="column">
                <ArtItem uid={props.uid} n={1} />
                <ArtItem uid={props.uid} n={2} />
            </Grid>
          </Grid>
        </div>
    );
}
