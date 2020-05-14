const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const superUser ='cfI6yrANPyTvhCrfB9HXBU2i1Hc2' 

function checkAuth(context) {
  if ( context.auth.uid === superUser ) {
    return true;
  }
  if ( context.auth && context.auth.token && context.auth.token.adm ) {
    return true;
  }

  return false;
}
exports.setClaims = functions.https.onCall((data, context) => {
  if (!checkAuth(context)) {
    return null;
  }

  return admin.auth().setCustomUserClaims(data.uid, {
    ...data.claims
  }).then(() => {
    return {
      uid: data.uid, claims: data.claims
    }
  }).catch(err => {
    return err;
  });
});

exports.getUsers = functions.https.onCall((data, context) => {
  if (!checkAuth(context)) {
    return null;
  }

  return admin.auth().listUsers(1000).then(listUsersResult => {
    reply = {};
    listUsersResult.users.forEach(user => {

        reply[user.uid] = {
          uid: user.uid,
          email: user.email,
          claims: user.customClaims
      }
    })
    return reply;
  })
})

exports.createUser = functions.https.onCall((data, context) => {
  if (!checkAuth(context)) {
    return null;
  }

  return admin.auth().createUser(data).then(user => {
    return user;
  })
})

exports.deleteUser = functions.https.onCall((data, context) => {
  if (!checkAuth(context)) {
    return false;
  }

  return admin.auth().deleteUser(data.uid).then(() => {
    return true;
  })
})

