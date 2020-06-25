import React from 'react';
import * as firebase from "firebase/app";
import "firebase/firestore";

export default class DocCollection extends React.Component {

    constructor(props) {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.collections.forEach(collection => {

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
        });
    }
  
  render() {
    return <div>{this.props.children(this.state)}</div>;
  } 
}
