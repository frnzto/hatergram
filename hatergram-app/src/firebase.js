import firebase from 'firebase/app'
import "firebase/storage"


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDsCPyebLwvNpfIFNPQ-yDKCJsTq-mJ0SE",
    authDomain: "hatergram-4d32b.firebaseapp.com",
    databaseURL: "https://hatergram-4d32b.firebaseio.com",
    projectId: "hatergram-4d32b",
    storageBucket: "hatergram-4d32b.appspot.com",
    messagingSenderId: "30122484283",
    appId: "1:30122484283:web:9c08420e3817d41d8cf21e",
    measurementId: "G-BFJZ77XN3J"
  })

export const storage = firebaseApp.storage();
