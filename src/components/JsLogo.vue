<template>
  <div class="container">
    <img class="logo" v-bind:src="logoUrl">
  </div>
</template>

<script>
export default {
  props: ['logo'],
  computed: {
    logoUrl: function () {
      return '../static/logos/' + this.logo.toLowerCase() + '.png'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 32px;
  margin-bottom: 32px;
}
</style>
