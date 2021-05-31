import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function TabShowIsOver(props) {
  return (
        <Box display="grid" justifyContent="center" alignContent="flex-end" >
            <Box maxWidth={500}>
                <br />
                <br />
            <Typography variant="h6">
                <b>Twilight Park Artists</b> Online Art Show 2021
            </Typography>
                <br />
                <br />
                <Typography variant="h6">
                    The show has ended and the gallery closed.  
                    <br />
                    <br />
                    We hope to see you in person next year! 
                </Typography>
                <br />
            </Box>
        </Box>
  );
}
