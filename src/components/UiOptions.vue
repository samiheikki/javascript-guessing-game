<template>
  <div class="container">
    <div class="button" v-for="option in options" v-on:click="answer(option.id)">
      {{ option.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['options'],
  methods: {
    answer: function (id) {
      this.$emit('answer', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}



.button:nth-child(even) {
  margin-left: 32px;
}

@media (max-width: 447px) {
  .button {
    width: 100%;
  }
  .button:before, .button:after {
    width: 100%;
  }

  .button {
    margin-left: 32px !important;
    margin-right: 32px !important;
  }
}
</style>
