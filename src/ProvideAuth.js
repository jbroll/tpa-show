import React, { useState, useEffect  } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export const AuthContext = React.createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function IsAuth({ children }) {
  const auth = useAuth();
  var index = 0;
  if (auth.user) {
    index = 1;
  }
  if (auth.user && auth.claims.reg) {
    index = Math.min(2, children.length -1);;
  }
  return children[index];
}

export function IsAdmin({ children }) {
  const auth = useAuth();
  const isAdmin = (auth.user && auth.user.email === "john@rkroll.com") || auth.claims.adm;
  return <div>{isAdmin ? children[0] : children[1]}</div>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return React.useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState({});
  
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        alert("Invalid email or password");
      })
      .then(response => {
        if (response) {
          setUser(response.user);
          return response.user;
        }
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((e) => {
        alert("Invalid email or password");
      })
      .then(response => {
        if (response) {
          setUser(response.user);
          return response.user;
        }
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        setClaims({});
      });
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then((token) => {
          setUser(user);
          setClaims({
            adm: !!token.claims.adm,
            reg: !!token.claims.reg
          });
        });
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Return the user object and auth methods
  return {
    user,
    claims,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}