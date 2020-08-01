import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    backBox: {
        position: 'absolute',
        height: "100%",
        top: 0
    },
}));

const iconStyle = {
        fontSize: '300%',
        color: "black"
    };

export default function ArtGalleryNav(props) {
    const classes = useStyles();

    const handleOnClick = (n) => {
        if (props.onClick != null) {
            props.onClick(n);
        }
    }

    return (
        <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                direction="column"
                className={classes.backBox} >
            <Grid item container justify='space-between' >
                <Grid item>
                    <IconButton onClick={() => { handleOnClick(-1); }}>
                        <ArrowBackIosSharpIcon style={iconStyle}/>
                    </IconButton>
                </Grid>
                <Grid item >
                    <IconButton onClick={() => { handleOnClick(0); }}>
                        { props.playing ?
                            <PauseCircleOutlineIcon style={iconStyle}/> :
                            <PlayCircleOutlineSharpIcon style={iconStyle}/>
                        }
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => { handleOnClick(1); }}>
                        <ArrowForwardIosSharpIcon style={iconStyle}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
}