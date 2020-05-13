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
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
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
    const [openDeleteUser, setOpenDeleteUser] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [openCreateUser, setOpenCreateUser] = React.useState(false);

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

    const handleOpenDeleteUser = (user) => {
        setUser(user);
        setOpenDeleteUser(true);
    }
    const handleCloseDeleteUser = () => {
        setOpenDeleteUser(false);
    }
    const handleDeleteUser = (uid) => {
        props.deleteUser(uid);
    }

    const handleOpenCreateUser = (user) => {
        setOpenCreateUser(true);
    }
    const handleCloseCreateUser = () => {
        setOpenCreateUser(false);
    }

    const handleCreateUser = (uid) => {
        props.createUser(uid);
    }

    const users = props.users;

    return (
        <div className={classes.galleryDiv}>
          <Table>
              <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>
                        <Button onClick={handleOpenCreateUser}>
                            <AddCircleTwoToneIcon/>
                        </Button>
                    </TableCell>
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
                    <TableCell>
                        <Button onClick={e => {handleOpenDeleteUser(user)}} >
                            <DeleteIcon />
                        </Button>
                    </TableCell>
                  </TableRow>
              )}
              </TableBody>
          </Table>
          <Dialog   open={openArtEntry} maxWidth="md" fullWidth={true} 
                    onClose={handleCloseArtEntry} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Artist - {artEntry.email}
                <Button onClick={handleCloseArtEntry} color="primary">
                    Close
                </Button>
            </DialogTitle>
            <DialogContent>
                <ArtEntry uid={artEntry.uid} />
            </DialogContent>
          </Dialog>
          <Dialog   open={openDeleteUser} maxWidth="md" 
                    onClose={handleCloseDeleteUser} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete User - {user.email}
            </DialogTitle>
            <DialogContent>
                Are you sure you want to delete {user.email}?
                <Button onClick={handleCloseDeleteUser}>Cancel</Button>
                <Button onClick={e => { handleDeleteUser(user.uid)}}>Delete</Button>
            </DialogContent>
          </Dialog>
          <Dialog   open={openCreateUser} maxWidth="md" 
                    onClose={handleCloseCreateUser} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create User</DialogTitle>
            <DialogContent>
                <Button onClick={handleCloseCreateUser}>Cancel</Button>
                <Button onClick={e => { handleCreateUser(user.uid)}}>Create</Button>
            </DialogContent>
          </Dialog>
        </div>
    );
}