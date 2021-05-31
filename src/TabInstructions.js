import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function tabinstructions(props) {
    return (
        <div>

        <Container fixed >
        <br />
        <br />
        <Grid container direction="row">

        <Grid md={6} item>
            <Typography variant="h6">
                <b>Instructions for Artists</b>
            </Typography>
            <p>
            This year's online show does not have an entry fee and Twilight
            will not take any commission on sales. We encourage artists to
            include prices for their work. All sales will be handled directly
            by the artists. To facilitate this, entries will include the
            option to display the artist&apos;s email and website as contact
            info.
            </p>
            <p>
                Please complete your entry by <b>July 23th </b>.
            </p>
            <p>
            Use the 'My Entry' dialog in the menu bar to create your art show
            entry. As usual, each artist is allowed two entries in our show.
            The information that you enter here will be presented to viewers
            of the gallery. This can include your contact email address (the
            one used to log in on this site), an optional Artists Website
            address and an optional description of yourself and your work. An
            entry must have an image and a title to be included in the
            gallery. The first time you access 'My Entry' you will be asked
            to agree to the Terms of Service.
            </p>
            <p>
            After you have created your entries you will be able to view them
            in the gallery and catalog pages as they will appear to our
            guests when the show opens.
            </p>
            <p>
            We recommend uploading images of your work without including the
            frame as these look nicer in our online format. Please remember to
            indicate if the pieces are framed or unframed when negotiating
            sales with possible buyers.
            </p>
        </Grid>
        </Grid>
        </Container>
        </div>
    );
}
