import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

import ArtistDialog from './ArtistDialog';
import ArtEntryDialog from './ArtEntryDialog';
import TabGalleryEmpty from './TabGalleryEmpty';
import Sortable from './Sortable';
import { useAuth } from './ProvideAuth'

const useStyles = makeStyles((theme) => ({    
    galleryDiv: {
        position: 'relative',
        height: '90vh',
        width: '90%',
        background: 'transparent',
        display: 'table',
        margin: '0 auto'
    },
}));

export default function Catalog(props) { 
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState("");
    const [artistEntries, setArtistEntries] = React.useState(null);
    const [title, setTitle] = React.useState(null);
    const [uid, setUid] = React.useState(null);
    const auth = useAuth();
    const admin = auth && auth.claims.adm;

    const mapToList = function(o, f) {
        var result = []
        Object.keys(o).forEach(k => {
            result.push(f(o[k], k, o));
        });
        return result;
    }

    const handleOpenArtist1 = (e) => {
        setOpenDialog("Artist");
        setArtistEntries([e]);
    };

    const handleOpenArtistN = (e) => {
        setOpenDialog("Artist");
        const akey = e.key.substr(0, e.key.length-2);
        setArtistEntries(data.filter(e => e.key.startsWith(akey)));
    };

    const handleCloseDialog = () => {
        setOpenDialog("");
    };

    const handleOpenEditEntry = (title, uid) => {
        setOpenDialog("Entry");
        setTitle(title);
        setUid(uid);
    };

    const [entries, setEntries] = React.useState([]);
    const [artists, setArtists] = React.useState([]);

    React.useEffect(() => {
        if (props.collections.artists == null || props.collections.entries == null) {
            return;
        }
        setArtists(props.collections.artists);
        setEntries(props.collections.entries);

    }, [props.collections.artists, props.collections.entries]);

    const getArtist = (ekey) => {
        const akey = ekey.substr(0, ekey.length-2);
        return artists[akey];
    }

    const data = mapToList(entries, (e, key) => {
        const artist = getArtist(key);

        if (artist == null) { return null; }

        return e.title == null ? null : (
            { artist: artist, 
              name: `${artist.first} ${artist.last}`,
              size: `${e.height || "?"} x ${e.width || "?"}`,
              
              // Sortable column data
              NAME: `${artist.last.toLowerCase()}, ${artist.first.toLowerCase()}`,
              TITLE: e.title.toLowerCase(),
              PRICE: e.price && Number(e.price.replace(/[^-0-9.]/g, "")),
              ...e
            }
        )
    }
    ).filter(v => v != null);

    if (props.collections.entries == null) { return null }

    if (data.length <= 0) {
        return <TabGalleryEmpty />;
    }

    const renderArtist = (cell, index, cellConfig, row, rowIndex, rowConfig, rows) => {
        if (rowIndex > 0 && row.artist.key === rows[rowIndex-1].artist.key) {
            return null;
        }

        return (
            <Link onClick={() => { handleOpenArtistN(row) }}>{cell}
            </Link>
        );
    }
    const renderTitle = (cell, index, cellConfig, row, rowIndex, rowConfig) => {
        return (
            <Link onClick={() => { handleOpenArtist1(row) }}>{cell}
            </Link>
        );
    }
    const renderEdit = (cell, index, cellConfig, row, rowIndex, rowConfig, rows) => {
        if (rowIndex > 0 && row.artist.key === rows[rowIndex-1].artist.key) {
            return null;
        }
        
        return (
            <Button onClick={e => { handleOpenEditEntry(row.name, row.artist.key) }} >
                <SettingsIcon />
            </Button>
        );
    }
    const tableConfig = [
    { id: 'name',  label: 'Artist', sort: "NAME",   cellRender: renderArtist},
    { id: 'title', label: 'Title',  sort: "TITLE",  cellRender: renderTitle},
    { id: 'media', label: 'Media',  sort: "media"},
    { id: 'size',  label: 'Size'},
    { id: 'price', label: 'Price',  sort: "PRICE",  align: "right"},
    ];

    if (admin) {
        tableConfig.unshift(
            { id: 'edit',  label: '',   cellRender: renderEdit},
        )
    }

    return (
        <div className={classes.galleryDiv}>
            <br />
          <Sortable config={tableConfig} rows={data} rowKey={row => row.key} stickyHeader search padding="none"/>
          { artistEntries == null ? null : <ArtistDialog open={openDialog === "Artist"} onClose={handleCloseDialog} entries={artistEntries} />}
          <ArtEntryDialog open={openDialog === "Entry"} onClose={handleCloseDialog} title={title} uid={uid} />
        </div>
    );
}