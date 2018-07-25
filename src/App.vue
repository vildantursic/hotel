<template>
  <div id="app">
    <Header @onLogout="onLogout"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/shared/Header'

export default {
  name: 'app',
  components: {
    Header
  },
  methods: {
    onLogout() {
      this.$store.commit('clearUser')
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
