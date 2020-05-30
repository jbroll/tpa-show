import React from 'react';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import { loadCollection, docContext } from './DocEdit';

export const ConfigContext = React.createContext(null);
export const useConfig = () => {
    return React.useContext(ConfigContext);
};

export default function DocConfig(props) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    loadCollection(props.document, setValue);
  }, [props.document]);

  const context = docContext(props.document, value);

  return (
    <ConfigContext.Provider value={context}>
        { value == null ? 
          <Box display="grid" justifyContent="center" alignContent="flex-end" css={{ height: 300 }}  >
            <CircularProgress /> 
          </Box>
        : props.children }
    </ConfigContext.Provider>
  );
}