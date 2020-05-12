import React from 'react';
import ArtEntry from './ArtEntry';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    galleryDiv: {
        position: 'relative',
        height: '90vh',
        width: '90%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        heigth: "100%",
        width: "100%"
    }
}));

export default function Users(props) { 
    const classes = useStyles();
    const [openArtEntry, setOpenArtEntry] = React.useState(false);
    const [artEntry, setArtEntry] = React.useState("")

    const handleOpenEntryOf = (uid) => {
        setOpenArtEntry(true);
        setArtEntry(uid);
    };

    const handleCloseArtEntry = () => {
        setOpenArtEntry(false);
    };

    const handleSetClaim = (uid, claim, value) => {
        props.setClaim(uid, claim, value);
    };

    const users = props.users;

    return (
        <div className={classes.galleryDiv}>
          <Table>
              <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {users.map(user => 
                  <TableRow key={user.uid}>
                    <TableCell>
                        <Link onClick={() => { handleOpenEntryOf(user) }}>{user.email}
                        </Link>
                    </TableCell>
                    <TableCell>
                        <Checkbox   checked={user.registered} 
                                    onChange={e => { handleSetClaim(user.uid, 'reg', e.target.checked)}} 
                                    name="registered" inputProps={{ 'aria-label': 'Registered' }} />
                    </TableCell>
                    <TableCell>
                        <Checkbox   checked={user.admin} 
                                    onChange={e => { handleSetClaim(user.uid, 'adm', e.target.checked)}} 
                                    name="admin" inputProps={{ 'aria-label': 'Admin' }} />
                    </TableCell>
                  </TableRow>
              )}
              </TableBody>
          </Table>
          <Dialog   open={openArtEntry} maxWidth="md" fullWidth={true} 
                    onClose={handleCloseArtEntry} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Artist - {artEntry.email}</DialogTitle>
            <DialogContent>
                <ArtEntry uid={artEntry.uid} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseArtEntry} color="primary">
                    Close
                </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}