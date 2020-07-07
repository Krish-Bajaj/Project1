// The coding part for crating an Admin i would suggest to by heart this if possible 
// this affects the functions part in firebase and under that logs also is affected i think

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made by an admin
    if(context.auth.token.admin !== true){
        return {error: 'only admins can add other admins'}
    }
    // get user and add custom claim(admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin : true
        });
    }).then(() => {
        return {
            message : `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return err;
    });  //promise
});