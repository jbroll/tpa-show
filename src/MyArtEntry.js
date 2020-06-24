import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import ArtEntryDialog from './ArtEntryDialog';
import { useAuth } from './ProvideAuth'

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
      <ArtEntryDialog open={open} onClose={handleClose} title={user.email} uid={uid} />
    </div>
  );
}

export default withRouter(MyArtEntry);