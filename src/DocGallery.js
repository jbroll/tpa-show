import React from 'react';
import Gallery from './Gallery.js'
import * as firebase from "firebase/app";

export const DocContext = React.createContext(null);

export default function DocEdit(props) {
  const [imageUrls, setImageUrls] = React.useState([]);

  React.useEffect(() => {
    const imageUrls = [];

    firebase.firestore().collection(props.collection).get().then(
      (reply) => {
        reply.forEach(doc => {
          imageUrls.push(doc.data().image);
       });
       setImageUrls(imageUrls);
    });
  }, [props.collection, props.imageUrls]);

  return (
    <Gallery imageUrls={imageUrls} />
  );
}