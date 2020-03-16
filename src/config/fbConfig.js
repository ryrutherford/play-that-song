  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  import 'firebase/analytics';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCiS_fQpcw_1JGpyXgdcb-f7n3U8fOCz2M",
    authDomain: "play-that-song-fac18.firebaseapp.com",
    databaseURL: "https://play-that-song-fac18.firebaseio.com",
    projectId: "play-that-song-fac18",
    storageBucket: "play-that-song-fac18.appspot.com",
    messagingSenderId: "843690786024",
    appId: "1:843690786024:web:dbf48faf223b36c2c39d5d",
    measurementId: "G-6092ZKX3KV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.firestore();//.settings({timestampsInSnapshots: true});

  export default firebase;