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

    const data = mapToList(entries, (e, key) => {
        const artist = getArtist(key);

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
    const tableConfig = [
    { id: 'name',  label: 'Artist', sort: "NAME",   cellRender: renderArtist},
    { id: 'title', label: 'Title',  sort: "TITLE",  cellRender: renderTitle},
    { id: 'media', label: 'Media',  sort: "media"},
    { id: 'size',  label: 'Size'},
    { id: 'price', label: 'Price',  sort: "PRICE",  align: "right"},
    ];

    return (
        <div className={classes.galleryDiv}>
            <br />
          <Sortable config={tableConfig} rows={data} rowKey={row => row.key} stickyHeader search padding="none"/>
          { artistEntries == null ? null : <ArtistDialog open={openArtist} onClose={handleCloseArtist} entries={artistEntries} />}
        </div>
    );
}