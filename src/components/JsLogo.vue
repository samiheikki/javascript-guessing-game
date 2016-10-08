<template>
  <div>
    <img class="logo" v-bind:src="logoUrl">
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: 'vue'
    }
  },
  computed: {
    logoUrl: function () {
      return '../static/logos/' + this.logo + '.png'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
