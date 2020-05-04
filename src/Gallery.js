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

    const [current, setCurrent] = React.useState(0);
    const [imageUrls, setImageUrls] = React.useState([]);

    React.useEffect(() => {
        setImageUrls(props.imageUrls);

        setTimeout(() => {
            const c = (current+1) % imageUrls.length;
            setCurrent(c);

        }, 5000)
    }, [current, imageUrls, props.imageUrls]);

    return (
        <div className={classes.galleryDiv}>
          {imageUrls.map((x, i) => 
            <Fade key={imageUrls[i]} in={current === i} timeout={1500}>
                <ScaledImage className={classes.img} src={imageUrls[i]} alt="Art Gallery"/>
            </Fade>
            )}
        </div>
    );
}