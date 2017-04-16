<template>
  <div class="container">
    <div class="flex">
      <router-link to="/">
        <h4>
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 16" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Play the game
        </h4>
      </router-link>
    </div>
    <h1>High Scores (top 10)</h1>
    <div class="scores-container">
      <div class="score-row" v-for="(score, index) in highScores">
        <h2 class="score-number">#{{index+1}}</h2>
        <div class="score-row-details">
          <h3>{{score.name || 'Anonymous'}}</h3>
          <span class="extra-detail">{{score.answerCount}} / {{score.amount}}</span>
        </div>
      </div>
      <div v-if="highScores.length === 0">
        <h3>Loading...</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'highScores'
    ])
  }
}
</script>

<style scoped>
.container {
  max-width: 100%;
  height: 76vh;
}
.scores-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.score-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.score-row-details {
  max-width: calc(100% - 40px);
}
.score-row-details > h3 {
  width: 200px;
  text-align: left;
  word-wrap: break-word;
}
.score-number {
  margin-right: 8px;
  margin-top: 15px;
  width: 50px;
}
.extra-detail {
  display: block;
  text-align: left;
  margin-left: 0px;
  color: #bbbbbb;
}
h1 {
  border-bottom: 1px solid;
  width: 600px;
  padding-bottom: 8px;
  margin-bottom: 8px;
}
h3 {
  margin-bottom: 4px;
}
h1, h3 {
  color: #66BB6A;
  word-wrap: break-word;
}
a {
  text-decoration: none;
}
h4 {
  color: white;
}
.flex {
  display: flex; 
}

@media screen and (max-width:620px) {
  h1 {
    width: 90vw;
    font-size: 1.5em;
  }
}
</style>
