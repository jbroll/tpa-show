import React from 'react';
import Typography from '@material-ui/core/Typography';
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

    const [current, setCurrent] = React.useState(0);
    const [docs, setDocs] = React.useState([]);

    React.useEffect(() => {
        setDocs(props.docs);

        setTimeout(() => {
            const c = (current+1) % docs.length;
            setCurrent(c);

        }, 5000)
    }, [current, docs, props.docs]);

    return (
        <div className={classes.galleryDiv}>
        <ul>
          {docs.map((x, i) => 
          <li key={docs[i].image}>
            <Typography key={docs[i].image}>
                {i} {docs[i].first} {docs[i].last}
            </Typography>
            </li>
            )}
        </ul>
        </div>
    );
}