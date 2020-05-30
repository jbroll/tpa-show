import React from 'react';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import ScaledImage from './ScaledImage';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import AppNavBar from './AppNavBar';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    galleryDiv: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
    titleDiv: {
        position: 'absolute',
        top: "5px"
    },
    img: {
        position: 'absolute',
        top: "0",
        left: 0,
        heigth: "100%",
        width: "100%"
    },
    navDiv: {
        display: 'block',
        width: "100%",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
    backBox: {
        height: "100%",
    },
}));

const iconStyle = {
        fontSize: '300%',
        color: "black",
        '&:hover': {
        background: "lightblue",
        borderRadius: 2,
      }
    };


export default function Gallery(props) { 
    const classes = useStyles();

    const nbuffer = 4;
    const [current, setCurrent] = React.useState(0);
    const [cbuffer, setCBuffer] = React.useState(0);
    const [entries, setEnries] = React.useState([]);
    const [playing, setPlaying] = React.useState(true);
    const [moved, setMoved] = React.useState(true);

    const movedEvent = () => {
        setMoved(true);
    };

    React.useEffect(() => {
        document.addEventListener('mousemove', movedEvent);
        return () => {
            document.removeEventListener('mousemove', movedEvent);
        }
    });

    React.useEffect(() => {
        if (!moved) { return; }

        const timer = setTimeout(() => {
            setMoved(false);
        }, 5000)
        return () => clearTimeout(timer);
    }, [moved]);

    React.useEffect(() => {
        if (props.entries == null) {
            return;
        }

        const entries = _.shuffle(_.map(props.entries, (entry, key) => {
            return { ...entry, key: key }
        }));
        setEnries(entries);
    }, [props.entries]);

    const wrap = (n, len) => {
        n = n % len;
        if (n < 0) { return len+n; }
        return n;
    };
    const advance = React.useCallback((n) => {
        const c = wrap(current+n, entries.length);
        const b = wrap(cbuffer+n, nbuffer);
        setCurrent(c);
        setCBuffer(b);
    }, [cbuffer, current, entries]);

    React.useEffect(() => {
        if (entries.length === 0) { return; }
        if (!playing) { return; }

        const timer = setTimeout(() => {
            advance(1);
        }, 5000)
        return () => clearTimeout(timer);
    }, [advance, cbuffer, current, entries, playing]);

    const forceRender = () => {
    };

    const handleGoBack = () => {
        advance(-1);
        setMoved(true);
    };
    const handleGoForward = () => {
        advance(1);
        setMoved(true);
    };

    const handlePauseOrPlay = () => {
        setPlaying(!playing);
        if (!playing) {
            advance(1);
        }
    };

    const buffers = [];
    var entry;
    var key;
    var artist;
    if (entries != null && entries.length !== 0) {
        for ( var i = 0; i < nbuffer; i++ ) {
            const nth = (current - 1 + i) % entries.length;

            const entry = _.nth(entries, nth);
            buffers[i] = {
                key: entry.key,
                image: entry.image
            }
        }
        entry = entries[current];
        key = entry.key;
        artist = entry.artist;
    }

    return (
        <div className={classes.galleryDiv}>
            {buffers.map((buff, i) => 
                <Fade key={buff.key} in={buff.key === key} timeout={1500}>
                    <ScaledImage className={classes.img} src={buff.image} alt="Art Gallery"/>
                </Fade>
              )
            }
            <Backdrop className={classes.backdrop} open={moved} invisible={true}>
                <div className={classes.navDiv}>
                    <AppNavBar position="static" onForceRender={forceRender} />
                </div>
                {/* 
                <Box item container background='white' padding={5}>
                    {artist}
                </Box>
                */}
                <Grid
                        container
                        spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                        className={classes.backBox} >
                    <Grid item container justify='space-between' >
                        <Grid item>
                            <IconButton onClick={handleGoBack}>
                                <ArrowBackIosSharpIcon style={iconStyle}/>
                            </IconButton>
                        </Grid>
                        <Grid item >
                            { playing ?
                                <IconButton onClick={handlePauseOrPlay}>
                                    <PlayCircleOutlineSharpIcon style={iconStyle}/>
                                </IconButton>
                            :
                                <IconButton onClick={handlePauseOrPlay}>
                                    <PauseCircleOutlineIcon style={iconStyle}/>
                                </IconButton>
                            }
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleGoForward}>
                                <ArrowForwardIosSharpIcon style={iconStyle}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Backdrop>
        </div>
    );
}