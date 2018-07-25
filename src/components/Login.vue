<template>
    <div>
        <el-input placeholder="Username" v-model="login.username"></el-input>
        <el-input placeholder="Password" type="password" v-model="login.password"></el-input>
        <router-link to="/register">Register</router-link>
        <el-button type="primary" @click="onLogin()">Login</el-button>
    </div>
</template>

<script>
import Service from '@/services/Service'
import Notifications from '@/services/Notifications'

export default {
  name: 'login',
  components: {
      Service,
      Notifications
  },
  data() {
      return {
          login: {
              username: 'vildan.tursic',
              password: 'test123'
          }
      }
  },
  methods: {
      onLogin() {
          return Service.methods
                        .post('api-token-auth', this.login)
                        .then((response) => {
                            this.$store.commit('setUser', response.data)
                            if (response.data) {
                                Notifications.methods.emit('Success', 'Successfully loged in', 'success')
                            } else {
                                Notifications.methods.emit('Error', 'Something is wrong', 'error')
                            }
                            this.$router.push('/')
                        })
      }
  }
}
</script>

<style scoped>

</style>
