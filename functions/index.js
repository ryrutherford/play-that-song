const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
}

exports.songRequested = functions.firestore
  .document('songRequestSessions/{songRequestSessionID}')
  .onWrite((doc, context) => {
    //the song request after the change (update, create, or delete)
    let songRequestAfter = doc.after.exists ? doc.after.data() : null;
    //the song request before the change (update, create, delete)
    let songRequestBefore = doc.before.exists ? doc.before.data() : null; 

    //THIS CLOUD FUNCTION DOES NOT DETECT IF A SONG WAS REQUESTED MULTIPLE TIMES IN A SESSION
    //if songRequestAfter exists, then the request was either created or updated, not deleted
    if(songRequestAfter){
      //if songRequestBefore exists, then the request was updated (requested or undone requested)
      if(songRequestBefore){
        //if the songRequests after is longer than the songRequests before, a new song was requested
        if(songRequestAfter.session.songRequests.length > songRequestBefore.session.songRequests.length){
          let sr = songRequestAfter.session.songRequests.slice(-1).pop();
          const notification = {
            title: `${sr.title}`,
            link: `${sr.externalURL}`,
            artists: `${sr.artists}`,
            time: admin.firestore.FieldValue.serverTimestamp()
          }
          return createNotification(notification);
        }
      }
    }
    //otherwise the request was deleted and we don't do anything
    return null;
})