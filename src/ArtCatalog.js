import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import ArtistDialog from './ArtistDialog';
import TabGalleryEmpty from './TabGalleryEmpty';
import Sortable from './Sortable';

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
    const [openArtist, setOpenArtist] = React.useState(false);
    const [artistEntries, setArtistEntries] = React.useState(null);

    const mapToList = function(o, f) {
        var result = []
        Object.keys(o).forEach(k => {
            result.push(f(o[k], k, o));
        });
        return result;
    }

    const handleOpenArtist1 = (e) => {
        setOpenArtist(true);
        setArtistEntries([e]);
    };

    const handleOpenArtistN = (e) => {
        setOpenArtist(true);
        const akey = e.key.substr(0, e.key.length-2);
        setArtistEntries(data.filter(e => e.key.startsWith(akey)));
    };

    const handleCloseArtist = () => {
        setOpenArtist(false);
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

    const data = mapToList(entries, (e, key) => 
        e.title == null ? null : (
            { artist: getArtist(key), 
              last: getArtist(key).last,
              ...e
            }
        )
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
            <Link onClick={() => { handleOpenArtistN(row) }}>{row.artist.first} {row.artist.last}
            </Link>
        );
    }
    const renderTitle = (cell, index, cellConfig, row, rowIndex, rowConfig) => {
        return (
            <Link onClick={() => { handleOpenArtist1(row) }}>{cell}
            </Link>
        );
    }
    const renderSize = (cell, index, cellConfig, row, rowIndex, rowConfig) => {
        return `${row.height || "?"} x ${row.width || "?"}`;
    }

    const tableConfig = [
    { id: 'last',  label: 'Artist', sortable: true,  cellRender: renderArtist},
    { id: 'title', label: 'Title',  sortable: true,  cellRender: renderTitle},
    { id: 'media', label: 'Media',  sortable: true},
    { id: 'width', label: 'Size',   sortable: false,  cellRender: renderSize},
    { id: 'price', label: 'Price',  sortable: true},
    ];

    return (
        <div className={classes.galleryDiv}>
            <br />
          <Sortable config={tableConfig} rows={data} rowKey={row => row.key} stickyHeader padding="none"/>
          { artistEntries == null ? null : <ArtistDialog open={openArtist} onClose={handleCloseArtist} entries={artistEntries} />}
        </div>
    );
}