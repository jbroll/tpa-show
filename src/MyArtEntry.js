import React from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import ArtEntry from './ArtEntry';
import { useAuth } from './ProvideAuth'
import OkButton from './OkButton';
import RDialog from './RDialog';

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

export function MyArtEntry(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const auth = useAuth();
  const user = auth.user;
  const uid = auth.user && auth.user.uid;
  const tos = auth.user && auth.claims.tos

  const handleClickOpen = () => {
    setOpen(tos);
    if (!tos) {
      props.history.push("/show-tos");
    }
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <div>
      <Button className={classes.title} variant="outlined" onClick={handleClickOpen}>
      <Typography className={classes.title} variant="h6" noWrap>
        My Entry
      </Typography>
      </Button>
      <RDialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle >Twilight Park Art Show Entry - {user.email}
          <OkButton onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <ArtEntry uid={uid}/>
        </DialogContent>
      </RDialog>
    </div>
  );
}

export default withRouter(MyArtEntry);