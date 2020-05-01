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
      flexDirection: 'row',
      marginBottom: 10
    },
    textField: {
      width: '100%'
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
           <Grid item xs={4} className={classes.imageBox}>
               <Button className={classes.image}>
                 <img className={classes.img} src="HainesFallsClove.jpg" alt="Drop Image Here"/>
               </Button>
           </Grid>
           <Grid container spacing={4} direction="row">
             <Grid item xs={12}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"title" + props.n}
                 label="Title"
                 type="text"
                 value=""
                 className={classes.textField}
               />
             </Grid>
             <Grid item xs={3}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"media" + props.n}
                 label="Media"
                 type="text"
                 className={classes.textField}
               />
             </Grid>
             <Grid item xs={3}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"height" + props.n}
                 label="Height"
                 type="text"
                 className={classes.textField}
               />
             </Grid>
             <Grid item xs={3}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"width" + props.n}
                 label="Width"
                 type="text"
                 className={classes.textField}
               />
             </Grid>
             <Grid item xs={3}>
               <TextField
                 onChange={handleTitleChange}
                 margin="dense"
                 id={"price" + props.n}
                 label="Price"
                 type="text"
                 className={classes.textField}
               />
             </Grid>
           </Grid>
         </div>;
}
