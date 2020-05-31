import React from 'react';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import _ from 'lodash';

import AppNavBar from './AppNavBar';
import ArtistDialog from './ArtistDialog'
import ScaledImage from './ScaledImage';
import TabGalleryEmpty from './TabGalleryEmpty';
import ArtGalleryNav from './ArtGalleryNav';

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
    info: {
        position: 'relative',
        topMargin: 10,
        zIndex: theme.zIndex.drawer + 3,
        background: 'rgba(240, 240, 240, .8)',
        padding: 10,
        borderRadius: "3em",
    },
}));

export default function ArtGallery(props) { 
    const classes = useStyles();

    var nbuffer = 4;
    const [current, setCurrent] = React.useState(0);
    const [cbuffer, setCBuffer] = React.useState(0);
    const [playing, setPlaying] = React.useState(true);
    const [wasPlaying, setWasPlaying] = React.useState(false);
    const [moved, setMoved] = React.useState(0);
    const [openArtist, setOpenArtist] = React.useState(false);
    const [entries, setEntries] = React.useState([]);
    const [artists, setArtists] = React.useState([]);


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

        if (entries.length > 0) {
            const timer = setTimeout(() => {
                setMoved(0);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [entries, moved]);

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

    const handleNavClick = (n) => {
        if ( n === 0) {
            setPlaying(!playing);
            if (!playing) {
                advance(1);
                setMoved(0);
            }
            return;
        }

        advance(n);
        movedEvent();
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

    const showTabEmpty = props.collections.entries && entries.length <= 0;
    const showBackdrop = moved !== 0 || showTabEmpty;
    const showNav = showBackdrop && entries.length > 0;

    return (
        <div className={classes.galleryDiv}>
            { showTabEmpty ? null :
                buffers.map((buff, i) => 
                    <Fade key={buff.key} in={buff.key === key} timeout={1500}>
                        <ScaledImage className={classes.img} src={buff.image} alt="Art Gallery"/>
                    </Fade>
                )
            }
            <Backdrop className={classes.backdrop} open={showBackdrop} invisible={true}>
                { showNav ? <ArtGalleryNav playing={playing} onClick={handleNavClick}/> : null }
                <AppNavBar position="static" onForceRender={props.onForceRender} />
                { showTabEmpty ? <TabGalleryEmpty className={classes.img}/> : null }
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