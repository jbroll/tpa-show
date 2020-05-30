import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function TabGalleryEmpty(props) {
  return (
      <Box display="grid" justifyContent="center" alignContent="flex-end" >
      <Box maxWidth={500}>
        <br />
        <br />
        <br />
        <br />
      <Typography variant="h6">
          Ohh no!!  The gallery is empty!  
      </Typography>
      <br />
      <br />
      <Typography variant="h6">
          As a registered artist you should go to the MyEntry dialog in the
          menu bar and create your art show entries. You will be able to see
          your entries in the gallery and catalog as soon as you enter them!
      </Typography>
        <br />
        <br />
      <Typography variant="h6">
          Entries will not appear in the catalog without a title.
      </Typography>
    </Box>
    </Box>
  );
}
