<template>
  <div>
    <ul>
      <li v-for="option in options">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['options']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
