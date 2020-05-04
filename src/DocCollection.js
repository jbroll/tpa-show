import React from 'react';
import * as firebase from "firebase/app";

export const DocContext = React.createContext(null);

export default function DocCollection(props) {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const d = [];

    firebase.firestore().collection(props.collection).get().then(
      (reply) => {
        reply.forEach(doc => {
          d.push(doc.data());
       });
       setDocs(d);
    });
  }, [props.collection]);

  return <div>{props.children(docs)}</div>;
}
