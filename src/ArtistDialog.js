
import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Artist from './Artist';
import OkButton from './OkButton';
import RDialog from './RDialog';

export default function ArtistDialog(props) {

    const artist = props.entries && props.entries[0] && props.entries[0].artist;

    return (
        <RDialog open={props.open} onClose={props.onClose} >
        <DialogTitle>Artist - {artist.first} {artist.last}
            <OkButton onClick={props.onClose}/>
        </DialogTitle>
        <DialogContent>
            <Artist entries={props.entries} size={800} />
        </DialogContent>
        </RDialog>
    );
}