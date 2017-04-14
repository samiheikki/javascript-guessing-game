<template>
  <div class="container">
    <h1>{{feedback}}</h1>
    <h2>{{answerCount}} / {{amount}}</h2>
    <button class="ripple-button button" v-on:click="restartGame">
      Restart
    </button>
    <div class="custom-tweet-button">
      <a :href="`https://twitter.com/intent/tweet?text=${(twitterText)}`" target="_blank" alt="Tweet your score">
        <i class="btn-icon"></i>
        <span class="btn-text">Tweet your score</span>
      </a>
    </div>
    <div class="custom-github-button">
      <a href="https://github.com/samiheikki/javascript-guessing-game" target="_blank" alt="Star samiheikki/javascript-guessing-game on GitHub">
        <i class="btn-icon"></i>
        <span class="btn-text">Star on GitHub</span>
      </a>
    </div>
    <router-link to="ranking" class="ranking-link">
      <h2>
        <svg fill="#66BB6A" height="24" viewBox="0 0 24 12" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
        </svg>
        View ranking
      </h2>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      insults: [
        'Why don’t you go back to your desk and tail call yourself?',
        'I never believed in chaos theory until I saw your variable naming convention!',
        'Your commit is writing checks your merge can’t cash.',
        'Your code, just like C. Has no class!',
        'Your coding methods are so backwards they’ve added it to the school curriculum in Texas!',
        'Your code runs so slow your data brings sleeping bags to camp-out in the cache lines.',
        'More unit tests? No! What your code needs is petrol and a match.',
        'Imagine an egg hitting a concrete pavement, that’s how hard-wired, inflexible and brittle your code is.',
        'Don\'t worry about it, I\'ll get someone technical to do this.',
        'You\'re slower than a Java app.',
        'You are one tab level off.',
        'Your code looks as though you have been playing bingo with anti-patterns.',
        'Your code is so wretched, that hard disks add it to their bad block lists.',
        'Clean, clear, and under control; three things that will never be said about your code.',
        'By popular demand, your code backup is in /dev/null/.'
      ]
    }
  },
  computed: {
    ...mapGetters({
      amount: 'amount',
      answerCount: 'answerCount'
    }),
    feedback: function () {
      const progress = (this.answerCount / this.amount) * 100 || 0
      if (progress < 1) {
        return 'Do you even JavaScript, bro?'
      } else if (progress >= 100) {
        return 'You did it! Now you can go back to your desk and start working.'
      } else {
        // 1 - 99
        return this.insults[Math.floor(Math.random() * this.insults.length)]
      }
    },
    twitterText: function () {
      return `You know there are too many JS libraries when there is a game for it 🎯 \n I got ${this.answerCount}/${this.amount}. Try it out! https://javascript-game.firebaseapp.com`
    }
  },
  methods: mapActions([
    'restartGame'
  ])
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
h1 {
  color: #66BB6A;
}
.button {
  margin: 0 auto 20px;
  display: block;
}
.custom-tweet-button, .custom-github-button {
  margin: 1em auto 2em;
  display: inline-block;
}
.custom-tweet-button a {
  position: relative;
  display: inline-block;
  height: 16px;
  padding: 2px;
  border: 1px solid #ccc;
  font-size: 11px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
  font-weight: bold;
  background-color: #1b95e0;
  border: #1b95e0 solid 1px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
}
.custom-github-button a {
  position: relative;
  display: inline-block;
  height: 16px;
  padding: 2px;
  border: 1px solid #ccc;
  font-size: 11px;
  color: #333;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
  font-weight: bold;
  background-color: #F8F8F8;
  border: #CCC solid 1px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
}
.custom-tweet-button a .btn-icon {
  position: absolute;
  width: 16px;
  height: 13px;
  top: 50%;
  left: 3px;
  margin-top: -6px;
  background: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E) 1px center no-repeat;
  background-size: 13px;
}
.custom-github-button a .btn-icon {
  position: absolute;
  width: 16px;
  height: 13px;
  top: 50%;
  left: 3px;
  margin-top: -6px;
  background: url('https://assets-cdn.github.com/favicon.ico') 1px center no-repeat;
  background-size: 13px;
}
.custom-tweet-button a .btn-text, .custom-github-button a .btn-text {
  display: inline-block;
  padding: 2px 3px 0 20px;
}
.ranking-link {
  text-decoration: none;
  color: #66BB6A;
}
.ranking-link > h2 {
  margin: 0;
}
.ranking-link:hover {
  text-decoration: underline;
}
@media screen and (max-width:620px) {
  .container {
    margin: 0 16px 0 16px;
  }
}
</style>
