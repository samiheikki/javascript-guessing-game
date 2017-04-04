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
      console.log(user)
      callback(user)
    })
  },
  loginWithGitHub () {
    // console.log('hre')
    // const provider = new firebase.auth.GithubAuthProvider()
    // console.log(provider)
    firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider())
  }
}
// import * as firebase from 'firebase'
// import 'firebase/auth'
//
// const _config = {
//   apiKey: 'AIzaSyDzKhNG-bafYPDTbAFFGqSscGJ7a-rdB9M',
//   authDomain: 'javascript-game.firebaseapp.com',
//   databaseURL: 'https://javascript-game.firebaseio.com',
//   storageBucket: 'javascript-game.appspot.com',
//   messagingSenderId: '853137885896'
// }
//
// export default {
//   initializeFireBase () {
//     firebase.initializeApp(_config)
//     this.firebaseAuthListener()
//   }
//   created: function () {
//     this.initializeFireBase()
//   },
//   methods: {
//     initializeFireBase: function () {
//
//
//     },
//     firebaseAuthListener: function () {
//       firebase.auth().onAuthStateChanged((user) => {
//         console.log(user)
//         // this.setUser(user)
//         // if (user) {
//         //   this.setToken()
//         // }
//       })
//     },
//     loginWithGitHub: function () {
//       // const provider = new firebase.auth.GithubAuthProvider()
//       // firebase.auth().signInWithRedirect(provider)
//       console.log('hre')
//     }
//   }
// }
