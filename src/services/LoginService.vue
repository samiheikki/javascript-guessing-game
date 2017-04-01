<template>
</template>

<script>
import * as firebase from 'firebase'
import 'firebase/auth'

export default {
  created: function () {
    this.initializeFireBase()
  },
  methods: {
    initializeFireBase: function () {
      const config = {
        apiKey: 'AIzaSyDzKhNG-bafYPDTbAFFGqSscGJ7a-rdB9M',
        authDomain: 'javascript-game.firebaseapp.com',
        databaseURL: 'https://javascript-game.firebaseio.com',
        storageBucket: 'javascript-game.appspot.com',
        messagingSenderId: '853137885896'
      }
      firebase.initializeApp(config)
      this.firebaseAuthListener()
    },
    firebaseAuthListener: function () {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        // this.setUser(user)
        // if (user) {
        //   this.setToken()
        // }
      })
    },
    loginWithGitHub: function () {
      const provider = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>
