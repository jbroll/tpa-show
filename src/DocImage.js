import React from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import firebase from "firebase/app";
import "firebase/storage";

import { DocContext } from './DocEdit'
import DragAndDrop from './DraqAndDrop';

 export const imageUrlResolver = (image) => {
    const parts = image.split('.'); 
    image = parts[0]
    var ver = "0";
    if (parts.length > 1) {
        ver = parts[1];
    } 
    console.log("resolve", image, ver)
    image = `https://firebasestorage.googleapis.com/v0/b/tpa-show-2020.appspot.com/o/images%2F${image}?alt=media&v=${ver}`;
  
    return image;
}

const useStyles = makeStyles((theme) => ({
    box : {
        position: 'relative',
        width: 175,
        height: 175,
    },
    button: {
        width: 175,
        height: 175,
    },
    image: {
        width: 175,
        height: 175,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '175px',
        maxHeight: '175px',
        textIndent: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        objectFit: 'scale-down',
    },
    delete: { 
        position: 'absolute', 
        top: -15, 
        right: -15, 
        zIndex: theme.zIndex.drawer + 3,
    },
    deleteIcon: { 
        color: 'red', 
        fontSize: 'large',
    },
    download: { 
        position: 'absolute', 
        top:  0, 
        left: -15, 
        zIndex: theme.zIndex.drawer + 3,
        color: 'blue', 
        fontSize: 'large',
    },
    text: {
        position: 'absolute',
        top: 0, 
        left: 0,
        bottom: 0, 
        right: 0,

        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        fontSize: '20px',
        backgroundColor: 'rgba(256,256,256,0.5)'
    },
    progress: {
        position: 'absolute',
    }
}));

function OpenFileButton(props) {
    const { onFileChange, ...others } = props;
    const inputRef = React.createRef();

    const handleFileClick = (e) => {
        inputRef.current.click(e);
    }

    const handleFileChange = (e) => {
        if (onFileChange && e.target.files) {
            onFileChange(e.target.files);
        }
    }

    return <div>
            <Button onClick={handleFileClick} {...others}/>
            <input onChange={handleFileChange} ref={inputRef} type="file" style={{display:"none"}}/>
        </div>
}
export default function DocImage(props) {
    const classes = useStyles();
    const [here, setHere] = React.useState(false);
    const [drag, setDrag] = React.useState(false);
    const [progress, setProgress] = React.useState(-1);
    
    const handleMouseEnter = () => {
        setHere(true);
    }
    const handleMouseLeave = () => {
        setHere(false);
    }

    const handleDrag = (drag) => {
        setDrag(drag);
    }

    React.useEffect(() => {
        //setFade(!props.image);
    }, [props.image]);

    return (
      <div className={classes.box}>
        <DocContext.Consumer>
          {(context => {

            const handleFileChange = (files) => {
                handleUpload(files[0]);
            }
            
            const handleUpload = (filename) => {
                var image = props.image;

                const storage = firebase.storage();
                storage.ref(`images/${image}`).put(filename)
                    .on(
                        "state_changed",
                        snapshot => {
                            // progress function ...
                            setProgress(Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            ));
                        },
                        error => {
                            setProgress(-1);
                        },
                        () => {
                            setProgress(100);
                            console.log("save val", context.value[props.field])
                            if (context.value[props.field] != null) {
                                image = context.value[props.field];

                            console.log("save img", image)

                                const parts = image.split('.'); 
                                image = parts[0]
                                var ver = "0";
                            console.log("save ver", ver)
                                if (parts.length > 1) {
                                    ver = (parseInt(parts[1]) + 1).toString();
                                } 
                                image = image + "." + ver;
                            }
                            console.log("save", image)
                            context.fieldSave(props.field, image).then(() => {
                                setProgress(-1);
                            });
                        }
                    );
            }

            const handleDelete = () => {
                const image = props.image;
                const storage = firebase.storage();
                storage.ref(`images/${image}`)
                    .delete()
                    .then(() => { context.fieldDelete(props.field).then(() => {}); })
                    .catch((err) => { 
                        console.log(err)
                        context.fieldDelete(props.field).then(() => {}); 
                    });
            }

            var hasImage = true;
            if (context.value == null || (context.value && context.value[props.field] == null) ) {
                hasImage = false;
            }
            var imageName = props.image;
            if (hasImage) {
                imageName = context.value[props.field]; 
                if (imageName.startsWith("https://")) {
                    imageName = props.image;
                }
            }
            const url = hasImage ? imageUrlResolver(imageName) : "blue.png";
            const fade = here || drag || !hasImage;

            return (
                <DragAndDrop onDrag={handleDrag} onDrop={handleFileChange}>
                    {hasImage ? 
                    <IconButton className={classes.delete} onClick={handleDelete}>
                        <HighlightOffIcon style={{ color: 'red', fontSize: '125%'}} />
                    </IconButton> : null}
                    {hasImage ? 
                        <a href={url} target="_blank"><GetAppIcon className={classes.download} style={{ fontSize: '125%'}} /> </a>
                    : null}
                    <OpenFileButton 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onFileChange={handleFileChange}
                        className={classes.button}>
                        <img className={classes.img} src={url} alt="Art Entry" />
                        {progress > 0 ? 
                            <CircularProgress size={100} variant="static" value={progress} className={classes.progress} /> :
                            <Fade in={fade} >
                                <Typography
                                    className={classes.text}>
                                    {!drag ?
                                        "Drop an image here or click to choose a file" :
                                        "Drop the image now!"
                                    }
                                </Typography>
                            </Fade>
                        }
                    </OpenFileButton>
                </DragAndDrop>
            );
          })}
        </DocContext.Consumer>
      </div>
    );
};
