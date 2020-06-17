import React from 'react';
import * as firebase from "firebase/app";
import _ from 'lodash';

export const DocContext = React.createContext(null);
export const useDocContext = () => {
    return React.useContext(DocContext);
};

export function loadCollection(docpath, onSetValue) {
    const [collection, document] = docpath.split('/');
    const doc = firebase.firestore().collection(collection).doc(document);

    return doc.onSnapshot((reply) => {
      const data = reply.data()
      if ( data ) {
          onSetValue(data);
      }
    });
}

export function fieldSave(field, value) {
    if (value == null) {
        if (this.value == null || this.value[field] == null) {
          return;
        } else {
          value = this.value[field];
        }
    }

    const [collection, document] = this.document.split('/');
    const doc = firebase.firestore().collection(collection).doc(document);

    var data = {
      [field]: value
    }
    return doc.set(data, {merge: true});
}

export function fieldValue(field, default_value) {
    var value;
    if (this.value && this.value[field]) {
        value = this.value[field]; 
    } else {
        if (default_value == null) {
            value = "";
        } else {
            value = default_value; 
        }
    }
    return value;
}

export function fieldDelete(field) {
    const [collection, document] = this.document.split('/');
    const doc = firebase.firestore().collection(collection).doc(document);

    return doc.update({
      [field]: firebase.firestore.FieldValue.delete()
  });
}

export function docContext(document, value) {
  const context = {};
  _.extend(context, {
      document: document,
      fieldSave: fieldSave.bind(context),
      fieldValue: fieldValue.bind(context),
      fieldDelete: fieldDelete.bind(context),
      value: value
  });
  return context;
}

export default function DocEdit(props) {
  const [value, setValue] = React.useState({});

  React.useEffect(() => {
    return loadCollection(props.document, setValue);
  }, [props.document]);

  const handleChange = (v, field) => {
    setValue({
      // Merge the updated name field into the existing state
      // using the spread operator
      ...value,
      [field]: v
    })
  }

  const context = docContext(props.document, value);
  _.extend(context, { onChange: handleChange })

  return (
    <DocContext.Provider value={context}>
        {props.children}
    </DocContext.Provider>
  );
}