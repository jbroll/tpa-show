import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

export default function Catalog(props) { 
    const classes = useStyles();

    const mapToList = function(o, f) {
        var result = []
        Object.keys(o).forEach(k => {
            result.push(f(o[k], k, o));
        });
        return result;
    }

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
        return artists[akey] == null ? null :
            `${artists[akey].first} ${artists[akey].last}`
    }

    const data = mapToList(entries, (e, key) => 
        e.title == null ? null : (
            { artist: getArtist(key), 
              key: key,
              ...e
            }
        )
    ).filter(v => v != null);

    return (
        <div className={classes.galleryDiv}>
          <Table>
              <TableHead>
                  <TableRow>
                    <TableCell>Artist</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Media</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {data.map(e => 
                  <TableRow key={e.key}>
                    <TableCell>{e.artist}</TableCell>
                    <TableCell>{e.title}</TableCell>
                    <TableCell>{e.media}</TableCell>
                    <TableCell>{e.price}</TableCell>
                  </TableRow>
              )}
              </TableBody>
          </Table>
        </div>
    );
}