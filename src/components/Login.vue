<template>
    <div class="main">
        <el-card @keyup.enter.native="onLogin()" class="login">
            <el-input placeholder="Username" v-model="login.username"></el-input>
            <el-input placeholder="Password" type="password" v-model="login.password"></el-input>
            <div class="buttons">
                <router-link to="/register">Register</router-link>
                <el-button type="primary" @click="onLogin()">Login</el-button>
            </div>
        </el-card>
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
              username: '',
              password: ''
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
                            this.$router.push('/')
                        } else {
                            Notifications.methods.emit('Error', 'Something is wrong', 'error')
                        }
                    })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/helpers';

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login {
        @extend .flex-it;
        flex-direction: column;

        * {
            margin-bottom: 10px;
        }
        .buttons {
            @extend .flex-it;
        }
    }
</style>
