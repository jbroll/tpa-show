import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        heigth: "100%",
        width: "100%"
    }
}));

export default function ScaledImage(props) { 
    const classes = useStyles();
    const transparentPixel="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    function handleLoad(e) {
        const img = e.currentTarget;
        if (img.src === transparentPixel) {
            return;
        }
        img.style.background="no-repeat url("+ img.src +") 50%";
        img.style.backgroundSize="contain";  // Use "contain", "cover" or a % value
        img.style.width="100%";
        img.style.height="100%";
        img.src=transparentPixel;
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img className={classes.img} onLoad={handleLoad} {...props} />;
}