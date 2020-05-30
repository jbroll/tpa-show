import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function ConfirmRegistration(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      <Typography variant="h6" noWrap>
        Confirm EMail
      </Typography>
      </Button>
      <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Twilight Park Art Show Entry</DialogTitle>
        <DialogContent>
            We are sorry that the email address with which you have signed in is 
            not on the list of pre-registered artists.  To register and be approved
            to post your work to the show please contact the Twilight Park Artists show 
            committee at xxxxxx@xxxxxx.com.  Thank you!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}