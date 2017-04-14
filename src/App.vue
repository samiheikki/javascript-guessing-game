<template>
  <div id="app">
    <progress-bar></progress-bar>
    <sound-toggle></sound-toggle>
    <login-view v-on:log-in="logIn" v-on:log-out="logOut"></login-view>
    <router-view v-on:save-score="saveScore"></router-view>
    <credits class="credits" v-if="routePath === '/'"></credits>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import 'firebase/auth'
import { mapGetters, mapActions } from 'vuex'

import ProgressBar from './components/ProgressBar'
import Credits from './components/Credits'
import SoundToggle from './components/SoundToggle'
import LoginView from './components/LoginView'

const firebaseConfig = {
  apiKey: 'AIzaSyDzKhNG-bafYPDTbAFFGqSscGJ7a-rdB9M',
  authDomain: 'javascript-game.firebaseapp.com',
  databaseURL: 'https://javascript-game.firebaseio.com',
  storageBucket: 'javascript-game.appspot.com',
  messagingSenderId: '853137885896'
}

export default {
  components: {
    ProgressBar,
    Credits,
    SoundToggle,
    LoginView
  },
  created: function () {
    this.firebase()

    if (this.routePath === '/ranking') {
      this.getHighScores()
    }
  },
  computed: {
    ...mapGetters([
      'amount',
      'answerCount',
      'startTime',
      'endTime',
      'user',
      'routePath',
      'highScores'
    ])
  },
  watch: {
    routePath: function (path) {
      if (path === '/ranking' && this.highScores.length === 0) {
        this.getHighScores()
      }
    }
  },
  methods: {
    ...mapActions([
      'setUser',
      'setHighScores',
      'setFirebaseFeedback'
    ]),
    logIn: function () {
      firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider())
    },
    logOut: function () {
      firebase.auth().signOut().then(() => {
        this.setUser(null)
      })
    },
    firebase: function () {
      firebase.initializeApp(firebaseConfig)

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref('users/' + user.uid).set({
            name: user.displayName,
            email: user.email,
            photo_url: user.photoURL
          }).then(() => {
            this.setUser(user)
            this.setFirebaseFeedback()
          })
        } else {
          this.setFirebaseFeedback()
        }
      })
    },
    saveScore: function () {
      // Save only logged in users scores
      if (this.user) {
        // Make object of values as it might change before saving
        const objToDb = {
          answerCount: this.answerCount,
          amount: this.amount,
          startTime: this.startTime,
          endTime: this.endTime,
          name: this.user.displayName
        }
        // See if there is a previous score
        firebase.database().ref('/scores/' + this.user.uid).once('value').then((snapshot) => {
          const previousScore = snapshot.val()
          if (!previousScore || (previousScore && this.shouldSaveNewScore(objToDb, previousScore))) {
            firebase.database().ref('scores/' + this.user.uid).set(objToDb)
          }
        })
      }
    },
    shouldSaveNewScore: function (newScore, oldScore) {
      const higherScore = newScore.answerCount > oldScore.answerCount
      const sameScore = newScore.answerCount === oldScore.answerCount
      const betterTime = (newScore.endTime - newScore.startTime) < (oldScore.endTime - oldScore.startTime)
      return higherScore || (sameScore && betterTime)
    },
    getHighScores: function () {
      firebase.database()
        .ref('/scores')
        .orderByChild('answerCount')
        .limitToLast(10)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            const highScores = Object.keys(snapshot.val())
              .map((k) => snapshot.val()[k])
              .sort((a, b) => {
                if (a.answerCount > b.answerCount) {
                  return -1
                } else if (b.answerCount > a.answerCount) {
                  return 1
                } else {
                  return 0
                }
              })
            this.setHighScores(highScores)
          }
        }
      )
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #000000;
  margin: 0;
}

#app {
  color: #2c3e50;
  margin-top: -50px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100px;
  height: 100px
}

@media screen and (max-height:500px) {
  .credits {
    display: none;
  }
  #app {
    margin-top: 0px;
  }
}

@media screen and (max-width:447px) {
  .credits {
    display: none;
  }
}
</style>
