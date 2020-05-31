
import React from 'react';
import Artist from './Artist';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RDialog from './RDialog';

import OkButton from './OkButton';

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