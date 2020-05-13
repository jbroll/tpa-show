import React from 'react';
import * as firebase from "firebase/app";

export const DocContext = React.createContext(null);

export default class UserData extends React.Component {

    constructor(props) {
        super();
        this.state = { users: {} }
    }
    getUsers = firebase.functions().httpsCallable('getUsers');
    setClaims = firebase.functions().httpsCallable('setClaims');
    deleteUser = firebase.functions().httpsCallable('deleteUser');

    handleSetClaim = (uid, claim, value) => {
        const data = {
            uid: uid,
            claims: {
                ...this.state.users[uid].claims,
                [claim]: value
            }
        }
        this.setClaims(data).then(
            (reply) => {
                this.setState((state, props) => {
                    return {
                        users: {
                        ...state.users,
                        [reply.data.uid]: {
                            'uid': uid,
                            'email': state.users[reply.data.uid].email,
                            'claims': reply.data.claims,
                        }
                    }
                } 
            });
        });
    }

    handleDeleteUser = (uid) => {
        this.deleteUser({ uid: uid }).then(
            reply => {
                this.setState((state, props) => {
                    const users = { ...state.users };
                    delete users[uid];

                    return {
                        users: users
                    }
                }) 
            }); 
    }

    handleCreateUser = () => {
        console.log("Create USer");
    }

    mapToList = function(o, f) {
        var result = []
        Object.keys(o).forEach(k => {
            result.push(f(o[k], k, o));
        });
        return result;
    }

    componentDidMount() {
        this.getUsers().then(
            (reply) => {
                this.setState((state, props) => ({
                    users: reply.data
                }));
        });
    }
  
 render() {
    const users = this.mapToList(this.state.users, (e, key) => {
        return {
            uid: e.uid,
            email: e.email,
            registered: !!(e.claims && e.claims.reg),
            admin: !!(e.claims && e.claims.adm)
        }
    });
    const props = { 
        users: users, 
        setClaim: this.handleSetClaim,
        deleteUser: this.handleDeleteUser,
        createUser: this.handleCreateUser
    }

    return <div>{this.props.children(props)}</div>;
  } 
}
