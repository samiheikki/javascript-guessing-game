<template>
  <div class="login-root">
    <button type="button" name="button" v-on:click="logIn" v-if="!user">Sign in with GitHub</button>
    <a href="#" v-on:click="openDropdown" v-if="user">
      <img :src="user.photoURL" :alt="displayName">
      <svg fill="#66BB6A" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </a>
    <div class="menu-content" v-if="dropdownOpen && user">
      <div class="dropdown-menu">
        <div class="dropdown-header">
          Signed in as <strong class="dropdown-name">{{user.displayName}}</strong>
        </div>
        <div class="dropdown-divider">
        </div>
        <router-link to="/ranking" class="dropdown-item">Ranking</router-link>
        <a href="#" class="dropdown-item" v-on:click="logOut">Sign out</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dropdownOpen: false
    }
  },
  watch: {
    dropdownOpen: function (value) {
      if (!value) {
        document.removeEventListener('click', this.dropdownAction)
      }
    }
  },
  computed: mapGetters({
    user: 'user'
  }),
  methods: {
    openDropdown: function (e) {
      e.preventDefault()
      if (!this.dropdownOpen) {
        document.addEventListener('click', this.dropdownAction)
        window.setTimeout(() => {
          this.dropdownOpen = true
        })
      }
    },
    dropdownAction: function (e) {
      if (typeof e.target.className === 'object' || e.target.className.indexOf('dropdown') < 0) {
        this.dropdownOpen = false
      }
    },
    logIn: function () {
      this.$emit('log-in')
    },
    logOut: function () {
      this.$emit('log-out')
    }
  }
}
</script>

<style scoped>
.login-root {
  position: absolute;
  top: 0;
  right: 0;
}
button {
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
a {
  text-decoration: none;
}
img {
  width: 30px;
  height: 30px;
  margin: 8px 0;
  border-radius: 5px;
}
svg {
  margin-bottom: 9px;
}
.dropdown-menu {
  width: 180px;
  position: absolute;
  top: 100%;
  right: 0;
  left: auto;
  background-color: #fff;
  background-clip: padding-box;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  margin-right: 8px;
  text-align: left;
  font-size: 14px;
  border: 1px solid rgba(128, 117, 117, 0.42);
}
.dropdown-menu::after{
  top: -14px;
  right: 27px;
  left: auto;
  border: 7px solid transparent;
  border-bottom-color: #fff;
  position: absolute;
  display: inline-block;
  content: "";
}
.dropdown-header {
  padding: 4px 15px;
  color: #586069;
}
.dropdown-item {
  display: block;
  padding: 4px 10px 4px 15px;
  overflow: hidden;
  color: #24292e;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dropdown-item:hover {
  color: #fff;
  text-decoration: none;
  background-color: #66BB6A;
}
.dropdown-divider {
  height: 1px;
  margin: 8px 1px;
  background-color: #e1e4e8;
}
.dropdown-name {
  white-space: nowrap;
}
</style>
