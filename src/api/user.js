import * as firebase from 'firebase'
import 'firebase/auth'

const _config = {
  apiKey: 'AIzaSyDzKhNG-bafYPDTbAFFGqSscGJ7a-rdB9M',
  authDomain: 'javascript-game.firebaseapp.com',
  databaseURL: 'https://javascript-game.firebaseio.com',
  storageBucket: 'javascript-game.appspot.com',
  messagingSenderId: '853137885896'
}

export default {
  initializeFirebase () {
    firebase.initializeApp(_config)
  },
  startListeningToAuth (callback) {
    this.initializeFirebase()
    firebase.auth().onAuthStateChanged((user) => {
      callback(user)
    })
  },
  loginWithGitHub () {
    firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider())
  },
  logOut () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    })
  }
}
