import React from 'react';

import { loadCollection, docContext } from './DocEdit';

export const ConfigContext = React.createContext(null);
export const useConfig = () => {
    return React.useContext(ConfigContext);
};

export default function DocConfig(props) {
  const [value, setValue] = React.useState({});

  React.useEffect(() => {
    loadCollection(props.document, setValue);
  }, [props.document]);

  const context = docContext(props.document, value);

  return (
    <ConfigContext.Provider value={context}>
        {props.children}
    </ConfigContext.Provider>
  );
}