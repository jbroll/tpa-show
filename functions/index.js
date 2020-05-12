const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setClaims = functions.https.onCall((data, context) => {
  if (context.auth.uid !== 'cfI6yrANPyTvhCrfB9HXBU2i1Hc2' && 
    !(context.auth && context.auth.token && context.auth.token.adm)) {
    console.log("No Auth");
    return null;
  }

  console.log(data);
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
  console.log(context.auth.uid);
  if (context.auth.uid !== 'cfI6yrANPyTvhCrfB9HXBU2i1Hc2' && 
    !(context.auth && context.auth.token && context.auth.token.adm)) {
    console.log("No Auth");
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
