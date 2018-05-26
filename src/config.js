import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  // testing db
  apiKey: "AIzaSyBVdq4HDOkzINT5TmYwlMPxaI5bJ4FhnN8",
  authDomain: "kiel-test-app.firebaseapp.com",
  databaseURL: "https://kiel-test-app.firebaseio.com",
  projectId: "kiel-test-app",
  storageBucket: "kiel-test-app.appspot.com",
  messagingSenderId: "910813321602"
};

export default (!firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore());
