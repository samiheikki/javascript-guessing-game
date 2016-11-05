<template>
  <p>Sound: <a href="#" v-on:click="onClick"><span v-if="sound">On</span><span v-else>Off</span></a></p>
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
p {
  position: absolute;
  top: 15px;
  left: 20px;
  margin: 0;
  text-transform: uppercase;
}
a {
  font-size: 14px;
  color: #66BB6A;
  text-decoration: none;
}
</style>
