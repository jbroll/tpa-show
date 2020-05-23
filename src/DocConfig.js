import React from 'react';
import * as firebase from "firebase/app";

export const ConfigContext = React.createContext(null);

export const useConfig = () => {
    return React.useContext(ConfigContext);
  };

export default function DocConfig(props) {
  const [value, setValue] = React.useState({});

  React.useEffect(() => {
    const [collection, document] = props.document.split('/');
    const doc = firebase.firestore().collection(collection).doc(document);

    return doc.onSnapshot((reply) => {
      const data = reply.data()
      if ( data ) {
          data.media.sort();
          setValue(data);
      }
    });
  }, [props.document]);


  return (
    <ConfigContext.Provider value={{
        document: props.document,
        value: value
    }}>

        {props.children}
    </ConfigContext.Provider>
  );
}