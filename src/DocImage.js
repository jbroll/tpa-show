import React from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DragAndDrop from './DraqAndDrop';
import { DocContext } from './DocEdit'
import * as firebase from "firebase/app";
import "firebase/storage";

const getId = function() {
    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ID_LENGTH = 8;

  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
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
                var image;
                if (props.image == null) {
                    image = getId();
                }  else {
                    image = props.image;
                }

                const storage = firebase.storage();
                const uploadTask = storage.ref(`images/${image}`).put(filename);
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // progress function ...
                        const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        //this.setState({ progress });
                        console.log(progress);
                    },
                    error => {
                        // Error function ...
                        console.log(error);
                    },
                    () => {
                        // complete function ...
                        storage
                            .ref("images")
                            .child(image)
                            .getDownloadURL()
                            .then(url => {
                                context.saveField(context, props.field, url);
                            });
                    }
                );
            }

            var hasImage = true;
            if (context.value == null || (context.value && context.value[props.field] == null) ) {
                hasImage = false;
            }
            const value = hasImage ? context.value[props.field] : "blue.png";
            const fade = here || !hasImage;

            return (
                <DragAndDrop onDrag={handleDrag} onDrop={handleFileChange}>
                    <OpenFileButton 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onFileChange={handleFileChange}
                        className={classes.button}>
                        <img 
                            className={classes.img} src={value} alt="Art Entry" />
                        <Fade in={fade} >
                            <Typography
                                className={classes.text}>
                                {!drag ?
                                    "Drop an image here or click to choose a file" :
                                    "Drop the image now!"
                                }
                            </Typography>
                        </Fade>
                    </OpenFileButton>
                </DragAndDrop>
            );
          })}
        </DocContext.Consumer>
      </div>
    );
};
