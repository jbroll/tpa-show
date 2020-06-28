
import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ArtEntry from './ArtEntry';
import OkButton from './OkButton';
import RDialog from './RDialog';

export default function ArtEntryDialog(props) {

  return (
    <RDialog open={props.open} onClose={props.onClose} >
      <DialogTitle >Twilight Park Art Show Entry - {props.title}
        <OkButton onClick={props.onClose} />
      </DialogTitle>
      <DialogContent>
        <ArtEntry uid={props.uid} />
      </DialogContent>
    </RDialog>
  );
}