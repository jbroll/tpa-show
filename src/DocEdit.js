import React from 'react';
import * as firebase from "firebase/app";

export const DocContext = React.createContext(null);

export default function DocEdit(props) {
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    const [collection, document] = props.document.split('/');
    const doc = firebase.firestore().collection(collection).doc(document);

    return doc.onSnapshot((reply) => {
      const data = reply.data()
      if ( data ) {
          setValue(data);
      }
    });
  }, [props.document]);

  const handleChange = (e, field) => {
    setValue({
      // Merge the updated name field into the existing state
      // using the spread operator
      ...value,
      [field]: e.target.value
    })
  }

  const fieldSave = (context, field, value) => {
      if (value === undefined) {
          value = context.value[field] 
      }
      if (value === undefined || value === null) {
          return;
      }

      const [collection, document] = context.document.split('/');
      const doc = firebase.firestore().collection(collection).doc(document);

      var data = {
        [field]: value
      }
      doc.set(data, {merge: true});
  }

  const fieldValue = (context, field, default_value) => {
        var value;
        if (context.value && context.value[field]) {
            value = context.value[field]; 
        } else {
            if (default_value == null) {
                value = "";
            } else {
                value = default_value; 
            }
        }
        return value;
  }

  return (
    <DocContext.Provider value={{
        document: props.document,
        handleChange: handleChange,
        fieldSave: fieldSave,
        fieldValue: fieldValue,
        value: value
    }}>

        {props.children}
    </DocContext.Provider>
  );
}