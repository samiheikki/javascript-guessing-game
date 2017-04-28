<template>
  <div class="container">
    <div class="flex-container" v-if="show">
      <ripple-button class="button" v-for="option in options" :text="option.name" :id="option.id" :key="option.id" v-on:button-click="answer"></ripple-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RippleButton from './RippleButton'

export default {
  components: {
    RippleButton
  },
  data () {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters({
      options: 'options'
    })
  },
  methods: {
    answer: function (id) {
      this.$emit('answer', id)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.button:nth-child(even) {
  margin-left: 32px;
}
.button {
  margin-top: 20px;
}

@media (max-width: 447px) {
  .button {
    width: 100%;
  }
  .button {
    margin-left: 32px !important;
    margin-right: 32px !important;
  }
}
</style>
