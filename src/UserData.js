import React from 'react';
import { AuthContext } from './ProvideAuth'
import * as firebase from "firebase/app";
import "firebase/functions";

export default class UserData extends React.Component {

    constructor(props) {
        super();
        this.state = { users: {} }
    }
    getUsers = firebase.functions().httpsCallable('getUsers');
    setClaims = firebase.functions().httpsCallable('setClaims');
    deleteUser = firebase.functions().httpsCallable('deleteUser');
    createUser = firebase.functions().httpsCallable('createUser');

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
        return new Promise(resolve => {
            this.deleteUser({ uid: uid }).then(
                reply => {
                    this.setState((state, props) => {
                        const users = { ...state.users };
                        delete users[uid];

                        return {
                            users: users
                        }
                    }) 
                    resolve();
                }); 
            });
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


    return <AuthContext.Consumer>
        {auth => {
            const handleCreateUser = (user) => {
                const claims = { reg: true, adm: false };

                return new Promise(resolve => {
                    this.createUser({ email: user }).then(reply => {
                        this.setClaims({ uid: reply.data.uid, claims: claims }).then(() => {
                            auth.sendPasswordResetEmail(reply.data.email);
                            this.setState((state, props) => {
                                const users = { 
                                    ...state.users,
                                    [reply.data.uid]: { 
                                        uid: reply.data.uid,
                                        email: reply.data.email,
                                        claims: claims
                                    }
                                };

                                return {
                                    users: users
                                }
                            });
                            resolve();
                        });
                    });
                });
            }

            const props = { 
                users: users, 
                setClaim: this.handleSetClaim,
                deleteUser: this.handleDeleteUser,
                createUser: handleCreateUser
            }

            return <div>{this.props.children(props)}</div>;
        }}
        </AuthContext.Consumer>
  } 
}
