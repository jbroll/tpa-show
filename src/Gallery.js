import React from 'react';
import Fade from '@material-ui/core/Fade';
import ScaledImage from './ScaledImage';
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
    }
}));

export default function Gallery(props) { 
    const classes = useStyles();

    const nbuffer = 4;
    const [current, setCurrent] = React.useState(0);
    const [cbuffer, setCBuffer] = React.useState(0);
    const [entries, setEnries] = React.useState([]);

    React.useEffect(() => {
        if (props.entries == null) {
            return;
        }

        const entries = _.shuffle(_.map(props.entries, (entry, key) => {
            return { ...entry, key: key }
        }));
        setEnries(entries);
    }, [props.entries]);

    React.useEffect(() => {
        if (entries.length === 0) { return; }

        setTimeout(() => {
            const c = (current+1) % entries.length;
            const b = (cbuffer+1) % nbuffer;
            setCurrent(c);
            setCBuffer(b);

        }, 5000)

    }, [cbuffer, current, entries]);

    const buffers = [];
    var key;
    if (entries != null && entries.length !== 0) {
        for ( var i = 0; i < nbuffer; i++ ) {
            const nth = (current - 1 + i) % entries.length;

            const entry = _.nth(entries, nth);
            buffers[i] = {
                key: entry.key,
                image: entry.image
            }
        }
        key = entries[current].key;
    }

    return (
        <div className={classes.galleryDiv}>
          {buffers.map((buff, i) => 
            <Fade key={buff.key} in={buff.key === key} timeout={1500}>
                <ScaledImage className={classes.img} src={buff.image} alt="Art Gallery"/>
            </Fade>
            )}
        </div>
    );
}