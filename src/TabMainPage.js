import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, } from "react-router-dom";

import { useConfig } from "./DocConfig";

export default function(props) {
  const config = useConfig(); 
    return (
        <div>

        <Container fixed >
        <br />
        <br />
        <Grid container direction="row">

        <Grid md={6} item>
            <Typography variant="h6">
                <b>Twilight Park Artists</b> Online Art Show 2020
            </Typography>
            { config.value.showIsOpen || config.value.showAll ?
                <>
                <p> We are pleased to present artwork from over 60 of our
                    mountaintop community artists! 
                </p>
                <div> <ul>
                    <li> <p align="left">
                        Click <Link to="/gallery" > <b>View the Gallery</b> </Link>
                        to start a slideshow of all pieces. 
                        </p>
                    </li>
                    <li> <p align="left">
                        Moving your cursor will show gallery controls and the title and artist of the displayed piece.
                        </p>
                    </li>
                    <li> <p align="left">
                        Clicking on the artist’s name will open a dialog with the artist's details.
                        </p>
                    </li>
                    </ul>
                </div>
                <p align="left">
                    If you would like to purchase a piece, please use the
                    contact information on the artist’s page to send an email
                    – all sales will be handled directly with the artist.
                    Some artists have included web sites to view more of
                    their works.
             
                    We hope you enjoy the show, and we look forward to gathering together to celebrate art in the future.
                </p></>
            : <>
                <p>
                    We will miss seeing all of our friends this summer, but we want
                    to support the mountain top art community and keep the spirit of
                    the show strong for when we return to the club house.
                </p>
                <p>
                    Artists are invited to participate by uploading images of their
                    works.  Please proceed to the <Link to="/welcome"
                    ><b>Welcome</b></Link> page to obtain your Art Show password.
                </p></>
            }
            <p>
            The show will be live on <b>August 1st</b> and run for the month.
            </p>
            <p>
                <br/>
            Please share this with your fellow artists and art patrons.
            </p>
        </Grid>
        <Grid md={6} height="50%" container item>
        <Grid xs={12} md={12} height="50%" item>
            <Link to="/gallery" >
            <Typography variant="h6" noWrap>
                View the Gallery
            </Typography>
            </Link>
        </Grid>
        { config.value.allowEntries ?
            <Grid xs={12} md={12} height="50%" item>
                <Link to="/instructions" >
                <Typography variant="h6" noWrap>
                    Instructions for Artists
                </Typography>
                </Link>
            </Grid> : null
        }
        </Grid>
        </Grid>
        <Box display="flex" justify="flex-start">
            <Box ml={3} padding={2}>
                <Link to="/terms-of-service"> <Typography variant="subtitle2"> Terms of Service </Typography> </Link>
            </Box>
            <Box padding={2}>
                <Link to="/privacy-policy"> <Typography variant="subtitle2"> Privacy Policy </Typography> </Link>
            </Box>
        </Box>
        </Container>
        </div>
    );
}
