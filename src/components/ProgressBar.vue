<template>
  <div class="container">
    <div class="progress" v-bind:style="{ width: progress + '%' }">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    progress: 'progress'
  })
}
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.progress {
  background-color: #66BB6A;
  height: 4px;
  transition: width 1s;
}
</style>
