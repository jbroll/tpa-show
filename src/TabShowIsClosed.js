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
                    The gallery is not open yet! 
                </Typography>
                <br />
                <br />
                <Typography variant="h6">
                    Please return after August 1st to view the show.
                </Typography>
            </Box>
        </Box>
  );
}
