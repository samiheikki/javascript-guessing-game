<template>
  <button type="button" name="button" v-on:click="logIn">Sign in with GitHub</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters({
    user: 'user'
  }),
  methods: mapActions([
    'logIn'
  ])
}
</script>

<style scoped>
button {
  position: absolute;
  top: 0;
  right: 0;
	width: 140px;
  background-color: #000;
  color: #66BB6A;
  text-align: center;
  text-transform: uppercase;
  font-size: 10px;
  border: 1px solid #66BB6A;
  border-radius: 8px;
  padding: 15px;
  outline: none;
  cursor: pointer;
  margin: 8px;
}
button:focus {
  outline: 2px solid #66BB6A !important;
}
</style>
