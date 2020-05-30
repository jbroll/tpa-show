import React from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ArtEntry from './ArtEntry';
import { useAuth } from './ProvideAuth'
import RDialog from './RDialog';
import OkButton from './OkButton';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: .1,
      "text-align": 'left',
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
        <DialogTitle >Twilight Park Art Show Entry 
          <OkButton onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <ArtEntry uid={uid}/>
        </DialogContent>
      </RDialog>
    </div>
  );
}