import React from 'react';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import * as firebase from "firebase/app";
import "firebase/firestore";

export default class DocCollection extends React.Component {

    constructor(props) {
        super();
        this.state = {};
    }

    loadCollection = (collection) => {
        var c = firebase.firestore().collection(collection);
        var w = this.props.where[collection];
        if (w != null) {
            for (var i = 0; i < w.length; i++) {
                if (w[i][1] === "!=" && w[i][2] == null) {
                    c = c.orderBy(w[i][0]).startAfter(null);
                } else {
                    c = c.where(w[i][0], w[i][1], w[i][2]);
                }
            }
        }
        
        c.get().then(
            (reply) => {
                const d = {};
                reply.forEach(doc => {
                    const data = doc.data();
                    if (this.props.filter(doc.id, data, collection)) {
                        d[doc.id] = {
                            key: doc.id,
                            ...data 
                        }
                    }
                });

                this.setState((state, props) => ({
                    [collection]: d
                }));
        });
    }

    loadDocument = (collection, document) => {
        const doc = firebase.firestore().collection(collection).doc(document);
        return doc.onSnapshot((reply) => {
        const data = reply.data()
        if ( data ) {
            this.setState((state, props) => ({
                [document]: data
            }));
        } else {
            this.setState((state, props) => ({
                [document]: {}
            }));
        }
        }, (error) => {
            console.log(error);
            this.setState((state, props) => ({
                [document]: {}
            }));
        });
    }

    componentDidMount() {
        this.props.collections.forEach(collection => {
            const [name, document] = collection.split('/');

            if (document == null) {
                this.loadCollection(collection);
            } else {
                this.loadDocument(name, document);
            }

        });
    }
  
  render() {
    const loaded = Object.keys(this.state).length === this.props.collections.length;

    return !loaded ? 
          <Box display="grid" justifyContent="center" alignContent="flex-end" css={{ height: 300 }}  >
            <CircularProgress /> 
          </Box>
        : <div>{this.props.children(this.state)}</div>
  } 
}
