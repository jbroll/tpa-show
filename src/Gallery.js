import React from 'react';
import Fade from '@material-ui/core/Fade';
import ScaledImage from './ScaledImage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    galleryDiv: {
        position: 'relative',
        height: '90vh',
        width: '90%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        heigth: "100%",
        width: "100%"
    }
}));

export default function Gallery(props) { 
    const classes = useStyles();

    const mapToList = function(o, f) {
        var result = []
        Object.keys(o).forEach(k => {
            result.push(f(o[k], k, o));
        });
        return result;
    }

    const [current, setCurrent] = React.useState(0);
    const [currentKey, setCurrentKey] = React.useState(0);
    const [entries, setEnries] = React.useState({});

    React.useEffect(() => {
        if (props.entries == null) {
            return;
        }

        setEnries(props.entries);

        if (Object.keys(entries).length === 0) { return; }
        setCurrentKey(Object.keys(entries)[current]);

        setTimeout(() => {
            const c = (current+1) % Object.keys(entries).length;
            setCurrent(c);
            setCurrentKey(Object.keys(entries)[c]);

        }, 5000)

    }, [current, entries, props.entries]);

    return (
        <div className={classes.galleryDiv}>
          {mapToList(entries, (obj, key) => 
            <Fade key={key} in={currentKey === key} timeout={1500}>
                <ScaledImage className={classes.img} src={obj.image} alt="Art Gallery"/>
            </Fade>
            )}
        </div>
    );
}