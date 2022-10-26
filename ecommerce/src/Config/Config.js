import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA7h2_ThBbalsTp4jxT46TjBOo5CumyygU",
    authDomain: "ecommerc-app-with-react.firebaseapp.com",
    projectId: "ecommerc-app-with-react",
    storageBucket: "ecommerc-app-with-react.appspot.com",
    messagingSenderId: "501674331162",
    appId: "1:501674331162:web:cc894010bd133a215fd5a3",
    measurementId: "G-T46HEXH7HL"
  };
  
firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const fs = firebase.firestore();
const storage = firebase.storage()

export {auth,fs,storage}