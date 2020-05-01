import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as firebase from "firebase/app";

import ArtItem from "./ArtItem";

// Controlled component - does not manage state internally
function DocField(props) {
    const saveField = () => {
      console.log("DocField Save", props.field, props.value);
      const doc = firebase.firestore().collection(props.collection).doc(props.doc);
      var data = {
        [props.field]: props.value
      }
      doc.update(data);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            saveField();
            console.log('enter')
        }
    }
    const handleBlur = (e) => {
        saveField();
    }
    return (
        <TextField
            onChange={props.handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur}
            id={props.field}
            name={props.field}
            label={props.label}
            margin="dense"
            type="text"
            value={props.value}
            style = {{ width: props.width }}
        />
    );
}

export default function MyArtEntry(props) {
  const [email, setEmail] = React.useState(props.email);
  const [entry, setEntry] = React.useState();
  const [name, setName] = React.useState({
    first: "",
    last: ""
  })

  const handleNameChange = (e, firstOrLast) => {
    setName({
      // Merge the updated name field into the existing state
      // using the spread operator
      ...name,
      [firstOrLast]: e.target.value
    })
  }

  const unsub = React.useEffect(() => {
    if (!email) { return; }

    const doc = firebase.firestore().collection('artists').doc(email);

    return doc.onSnapshot((reply) => {
      const data = reply.data()
      console.log("Reply data", data);
      setEntry(data);
      setName(data ? {first: data.first, last: data.last} : {});
    });
  }, [email]);

  return (
      <div>
          <Grid container directoin="column" >
              <Grid item container direction="row" padding={1} xs={12}>
                <Grid item xs={6}>
                  <DocField
                    label="First Name"
                    collection="artists"
                    doc={email}
                    field="first"
                    value={name.first}
                    handleChange={e => handleNameChange(e, 'first')}
                    width="90%" />
                </Grid>
                <Grid item xs={6}>
                  <DocField
                    label="Last Name"
                    collection="artists"
                    doc={email}
                    field="last"
                    value={name.last}
                    handleChange={e => handleNameChange(e, 'last')}
                    width="90%" />
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
