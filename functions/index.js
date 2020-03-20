const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
}

exports.songRequested = functions.firestore
  .document('songRequests/{songRequestID}')
  .onWrite((doc, context) => {
    //the song request after the change (update, create, or delete)
    let songRequestAfter = doc.after.exists ? doc.after.data() : null;
    //the song request before the change (update, create, delete)
    let songRequestBefore = doc.before.exists ? doc.before.data() : null; 

    //if songRequestAfter exists, then the request was either created or updated, not deleted
    if(songRequestAfter){
      //if songRequestBefore exists, then the request was updated (requested or undone requested)
      if(songRequestBefore){
        //if the songRequestBefore the change had more requests than the songRequestAfter, a notification is produced
        if(songRequestBefore.numRequests < songRequestAfter.numRequests){
          const notification = {
            title: `${songRequestAfter.title}`,
            link: `${songRequestAfter.externalURL}`,
            artists: `${songRequestAfter.artists}`,
            time: admin.firestore.FieldValue.serverTimestamp()
          }
          return createNotification(notification);
        }
        //otherwise no notification is produced
      }
      //otherwise the songRequest was just created
      else{
        const notification = {
          title: `${songRequestAfter.title}`,
          link: `${songRequestAfter.externalURL}`,
          artists: `${songRequestAfter.artists}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
      }
    }
    //otherwise the request was deleted and we don't do anything
    return null;
})