import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as firebase from "firebase/app";

import ArtItem from "./ArtItem";

function DocField(props) {
    const [value, setValue] = React.useState();

    React.useEffect(() => {
        console.log("Set value from props =", props.value);
        setValue(props.value)
     }, [props.value])

    const width = props.width;

    const saveField = () => {
        if (value === props.value) { return; }

        const field = props.field;

        console.log("DocField Save", props.field, props.value, value);
        //return;
        const doc = firebase.firestore().collection(props.collection).doc(props.doc);
        var data = {}
        data[field] = value;
        doc.update(data);
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            saveField(value);
            console.log('enter')
        }
    }
    const hanldeBlur = (e) => {
        saveField();
    }
    return (
        <TextField
            onChange={handleChange} onKeyDown={handleKeyDown} onBlur={hanldeBlur}
            id={props.field}
            name={props.field}
            label={props.label}
            margin="dense"
            type="text"
            value={value}
            style = {{width: "90%"}} 
        />
    );
}

export default function MyArtEntry(props) {
  const [email, setEmail] = React.useState(props.email);
  const [entry, setEntry] = React.useState();

  const handleNameChange = (e) => {
    //setName(e.target.value);
  };

  const unsub = React.useEffect(() => {
    if (unsub) { unsub(); }
    if (!email) { return; }

    const doc = firebase.firestore().collection('artists').doc(email);

    return doc.onSnapshot((reply) => { 
        console.log(reply.data());
        setEntry(reply.data()); }); 
  }, [email]);

  var first = entry ? entry.first : "";
  var last = entry ? entry.last : "";
  console.log("Render", first, last);

  return (
      <div>
          <Grid container directoin="column" >
              <Grid item container direction="row" padding={1} xs={12}>
                <Grid item xs={6}>
                  <DocField label="First Name" collection="artists" doc={email} field="first" value={first} width="50%" />
                </Grid>
                <Grid item xs={6}>
                  <DocField label="Last Name" collection="artists" doc={email} field="last" value={last} width="50%" />
                </Grid>
              </Grid>

            <Grid item container xs={12}>
                <ArtItem n={1} item={entry && entry.item && entry.item[0]}/>
                <ArtItem n={2} item={entry && entry.item && entry.item[1]}/>
            </Grid>
          </Grid>
    </div>
  );
}
