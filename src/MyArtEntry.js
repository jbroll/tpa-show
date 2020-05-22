import React from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ArtEntry from './ArtEntry';
import { useAuth } from './ProvideAuth'
import RDialog from './RDialog';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: .1,
      display: 'none',
      "text-align": 'left',
      [theme.breakpoints.up('xs')]: {
        display: 'block',
      },
      '&:hover': {
        background: "lightblue",
        borderRadius: "1em",
      }
    }, 
}));

export default function MyArtEntry(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const user = useAuth().user;
  const uid = user && user.uid;

  return (
    <div>
      <Button className={classes.title} variant="outlined" onClick={handleClickOpen}>
      <Typography className={classes.title} variant="h6" noWrap>
        My Entry
      </Typography>
      </Button>
      <RDialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Twilight Park Art Show Entry 
          <Button onClick={handleClose} color="primary" style={{ float: "right" }}>
            Close
          </Button>
        </DialogTitle>
        <DialogContent>
          <ArtEntry uid={uid}/>
        </DialogContent>
      </RDialog>
    </div>
  );
}