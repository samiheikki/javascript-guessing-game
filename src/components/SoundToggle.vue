<template>
  <a href="#" v-on:click="onClick"><i class="material-icons" v-if="sound">volume_up</i><i class="material-icons" v-else>volume_off</i></a>
</template>

<script>
export default {
  props: ['sound'],
  methods: {
    onClick: function (e) {
      e.preventDefault()
      this.$emit('sound-toggle')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 14px;
  color: #66BB6A;
  text-decoration: none;
}
</style>
