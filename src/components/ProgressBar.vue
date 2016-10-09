<template>
  <div class="container">
    <div class="progress" v-bind:style="{ width: progress + '%' }">
    </div>
  </div>
</template>

<script>
export default {
  props: ['progress']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: absolute;
  top: 0;
  width: 100%;
}

.progress {
  background-color: #4CAF50;
  height: 4px;
  transition: width 1s;
}
</style>
