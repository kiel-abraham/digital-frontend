import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyBVdq4HDOkzINT5TmYwlMPxaI5bJ4FhnN8",
  authDomain: "kiel-test-app.firebaseapp.com",
  databaseURL: "https://kiel-test-app.firebaseio.com",
  projectId: "kiel-test-app",
  storageBucket: "kiel-test-app.appspot.com",
  messagingSenderId: "910813321602"
};

var app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

var storage = app.storage();
var firestore = app.firestore();
var auth = app.auth();

export { storage, firestore, auth };
