import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from "firebase/app";

import DocEdit from './DocEdit';
import DocCheckbox from './DocCheckbox';
import DialogButton from './DialogButton';

export default function TabConfig(props) {
    const [openDialog, setOpenDialog] = React.useState("");

    const handleOpenSaveShow = () => {
        setOpenDialog("SaveShow");
    };

    const handleSaveShow = () => {
        const entries = {};
        Object.keys(props.collections.entries).forEach(key => {
            if ("image" in props.collections.entries[key]) {
                entries[key] = {
                    ...props.collections.entries[key],
                    image: key
                }
            }
        })
        var artists = {};
        Object.keys(props.collections.artists).forEach(key => {
            if ((key + "-1") in entries || (key + "-2") in entries ) {
                artists[key] = props.collections.artists[key];
            }
        })

        firebase.firestore().collection("config").doc("artists").set(artists).then(() => {
            firebase.firestore().collection("config").doc("entries").set(entries).then(() => {
                setOpenDialog("");
            });
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog("");
    };

    return (
        <Box>
            <DocEdit document="config/tpa-2020">
                <ul>
                    <li>
                        <DocCheckbox label="Art Show is Open" field="showIsOpen" />
                    </li>
                    <li>
                        <DocCheckbox label="Force Art Show Empty" field="showIsEmpty" />
                    </li>
                    <li>
                        <DocCheckbox label="Admin Art Show All entries" field="showAll" />
                    </li>
                    <li>
                         <DocCheckbox label="Admin Art Show Saved" field="showSaved" />
                    </li>
                </ul>
            </DocEdit>
            <Button onClick={handleOpenSaveShow} > Save Show </Button>
          <Dialog   open={openDialog === "SaveShow"} maxWidth="md" 
                    onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Save Show
            </DialogTitle>
            <DialogContent>
                Are you sure you want save the Show?
            </DialogContent>
            <DialogActions>
                <DialogButton onClick={handleCloseDialog}>Cancel</DialogButton>
                <DialogButton onClick={e => { handleSaveShow()}}>Save</DialogButton>
            </DialogActions>
          </Dialog>
        </Box>
    );
}