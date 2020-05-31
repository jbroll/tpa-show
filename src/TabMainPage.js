import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link, } from "react-router-dom";
export default function(props) {
    return (
        <Container fixed>
        <br />
        <br />
        <Grid container direction="row">

        <Grid md={6} item>
            <Typography variant="h6">
                <b>Twilight Park Artists</b> Online Art Show 2020
            </Typography>
            <p>
            We will miss seeing all of our friends this summer, but we want to support 
            the artists and keep the spirit of the show strong for when we return to the club house.
            </p>
            <p>
            Artists are invited to participate by uploading images of their works. 
            If you have already received an email invitation to participate, please proceed to 
            the <Link to="/welcome" >Welcome</Link> page to obtain your Art Show password.  
            </p>
            <p>
            The show will be live on August 1, 2020. Please share this with your 
            fellow artists and art patrons.
            </p>
        </Grid>
        <Grid md={6} height="100%" item>
            <Link to="gallery" >
            <Typography variant="h6" noWrap>
                View the Gallery
            </Typography>
            </Link>
        </Grid>
        </Grid>
        </Container>
    );
}
