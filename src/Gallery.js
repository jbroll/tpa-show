import React from 'react';
import Fade from '@material-ui/core/Fade';
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
    const src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    const classes = useStyles();

    const [current, setCurrent] = React.useState(0);
    const [imageUrls, setImageUrls] = React.useState([]);

    const imageRefs = React.useRef([]);

    React.useEffect(() => {
        setImageUrls(props.imageUrls);

        setTimeout(() => {
            const c = (current+1) % imageUrls.length;
            setCurrent(c);

        }, 5000)
    }, [current, imageUrls, props.imageUrls]);

    function handleLoad(e) {
        const img = e.currentTarget;
        if(img.isScaled) return;
        img.style.background="no-repeat url("+ img.src +") 50%";
        img.style.backgroundSize="contain";  // Use "contain", "cover" or a % value
        img.style.width="100%";
        img.style.height="100%";
        img.isScaled=true; // Prevent triggering another onload on src change
        img.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }

    function pushRef(ref) {
        imageRefs.current.push(ref);
    }

    for (var i = 0; i < imageUrls.length; i++) {
        if (imageRefs.current[i] != null) {
            imageRefs.current[i].isScaled = false;
        }
    }

    return (
        <div className={classes.galleryDiv}>
          {imageUrls.map((x, i) => 
            <Fade in={current === i} timeout={1500}>
                <img key={imageUrls[i]} ref={pushRef}
            className={classes.img} onLoad={handleLoad} src={imageUrls[i]} alt="Art Gallery"/>
            </Fade>
            )}
        </div>
    );
}