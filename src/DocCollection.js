import React from 'react';
import * as firebase from "firebase/app";

export default class DocCollection extends React.Component {

    constructor(props) {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.collections.forEach(collection => {

            console.log(collection);
            firebase.firestore().collection(collection).get().then(
                (reply) => {
                    const d = {};
                    reply.forEach(doc => {
                        d[doc.id] = doc.data(); 
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
