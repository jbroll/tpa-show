import React from 'react';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import ScaledImage from './ScaledImage';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import AppNavBar from './AppNavBar';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import _ from 'lodash';

import ArtistDialog from './ArtistDialog'
import TabGalleryEmpty from './TabGalleryEmpty';

const useStyles = makeStyles((theme) => ({    
    galleryDiv: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
    img: {
        position: 'absolute',
        top: "0",
        left: 0,
        heigth: "100%",
        width: "100%"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
        height: '100vh',
        width: '100%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
    backBox: {
        position: 'absolute',
        height: "100%",
        top: 0
    },
    info: {
        position: 'relative',
        topMargin: 10,
        zIndex: theme.zIndex.drawer + 3,
        background: 'rgba(240, 240, 240, .8)',
        padding: 10,
        borderRadius: "3em",
    },
}));

const iconStyle = {
        fontSize: '300%',
        color: "black"
    };


export default function ArtGallery(props) { 
    const classes = useStyles();

    var nbuffer = 4;
    const [current, setCurrent] = React.useState(0);
    const [cbuffer, setCBuffer] = React.useState(0);
    const [playing, setPlaying] = React.useState(true);
    const [wasPlaying, setWasPlaying] = React.useState(false);
    const [moved, setMoved] = React.useState(0);
    const [openArtist, setOpenArtist] = React.useState(false);

    const movedEvent = () => {
        setMoved(Math.random()+1);
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
            setMoved(0);
        }, 5000)
        return () => clearTimeout(timer);
    }, [moved]);

    const [entries, setEntries] = React.useState([]);
    const [artists, setArtists] = React.useState([]);

    React.useEffect(() => {
        if (props.collections.artists == null || props.collections.entries == null) {
            return;
        }

        const entries = _.shuffle(_.map(props.collections.entries, (entry, key) => {
            return { ...entry, key: key }
        }));

        setArtists(props.collections.artists);
        setEntries(entries);
    }, [props.collections.artists, props.collections.entries]);

    const wrap = (n, len) => {
        n = n % len;
        if (n < 0) { return len+n; }
        return n;
    };
    const advance = React.useCallback((n) => {
        const c = wrap(current+n, entries.length);
        const b = wrap(cbuffer+n, Math.min(nbuffer, entries.length));
        setCurrent(c);
        setCBuffer(b);
    }, [cbuffer, current, entries.length, nbuffer]);

    React.useEffect(() => {
        if (entries.length === 0) { return; }
        if (!playing) { return; }

        const timer = setTimeout(() => {
            advance(1);
        }, 5000)
        return () => clearTimeout(timer);
    }, [advance, cbuffer, current, entries, playing]);

    const handleGoBack = () => {
        advance(-1);
        movedEvent();
    };
    const handleGoForward = () => {
        advance(1);
        movedEvent();
    };

    const handlePauseOrPlay = () => {
        setPlaying(!playing);
        if (!playing) {
            advance(1);
            setMoved(0);
        }
    };

    const handleOpenArtist = () => {
        setWasPlaying(playing);
        setPlaying(false);
        setOpenArtist(true);
    }
    const handleCloseArtist = () => {
        setOpenArtist(false);
        setPlaying(wasPlaying);
    }

    const getArtist = (ekey) => {
        const akey = ekey.substr(0, ekey.length-2);
        return artists[akey];
    }

    const buffers = [];
    var entry;
    var key;
    var title;
    if (entries.length !== 0) {
        for ( var i = 0; i < Math.min(nbuffer, entries.length); i++ ) {
            const nth = (current - 1 + i) % entries.length;

            const entry = _.nth(entries, nth);
            buffers[i] = {
                key: entry.key,
                image: entry.image
            }
        }
        entry = entries[current];
        entry.artist = getArtist(entry.key);
        key = entry.key;
        title = entry.title;
    }

    return (
        <div className={classes.galleryDiv}>
            { props.collections.entries && entries.length <= 0 ?
                <TabGalleryEmpty className={classes.img}/> :
                buffers.map((buff, i) => 
                    <Fade key={buff.key} in={buff.key === key} timeout={1500}>
                        <ScaledImage className={classes.img} src={buff.image} alt="Art Gallery"/>
                    </Fade>
                )
            }
            <Backdrop className={classes.backdrop} open={moved !== 0} invisible={true}>
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
                <div>
                    <AppNavBar position="static" onForceRender={props.onForceRender} />
                </div>
                { title == null ? null :
                    <Grid container justify='space-between' padding={4} className={classes.info}>
                        <Grid item>
                            <Typography variant='h5' >
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h5' >
                                <Link onClick={handleOpenArtist} >More...</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                }
                { entry == null ? null : <ArtistDialog open={openArtist} onClose={handleCloseArtist} entries={[entry]} />}
            </Backdrop>
        </div>
    );
}