
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    spacer: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      marginTop: "100%",
      },
      table: {
        root: {
            borderBottom: "none !important",
            "background-color": "transparent !important",
            "border-color": "transparent !important"
          }
      }
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    divStyle: {
      display: 'flex',
      flexDirection: 'row'
    },
    titleText: {
      width: '66%'
    },
    imageBox: {
      margin: 10
    },
}));

export default function ArtItem(props) {
  const classes = useStyles();

  const handleTitleChange = () => {

  };

  return <div className = {classes.divStyle}>
           <Grid container direction="row" xs={2} className={classes.imageBox}>
             <Grid item xs={2}>
               <Button className={classes.image}>
                 <img className={classes.img} src="HainesFallsClove.jpg" alt="Drop Image Here"/>
               </Button>
             </Grid>
           </Grid>
           <Grid container direction="row" spacing={1} xs={12}>
             <Grid item xs={12}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"title" + props.n}
                 label="Title"
                 type="text"
                 value="4"
                 className={classes.titleText}
               />
             </Grid>
             <Grid item xs={2}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"media" + props.n}
                 label="Media"
                 type="text"
               />
             </Grid>
             <Grid item xs={2}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"height" + props.n}
                 label="Height"
                 type="text"
               />
             </Grid>
             <Grid item xs={2}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"width" + props.n}
                 label="Width"
                 type="text"
               />
             </Grid>
             <Grid item xs={2}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"price" + props.n}
                 label="Price"
                 type="text"
               />
             </Grid>
           </Grid>
         </div>;
}
