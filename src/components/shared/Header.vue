<template>
    <header>
        <nav>
            <div>
                <router-link v-show="isLoggedIn" to="/">Dashboard</router-link>
                <router-link v-show="isLoggedIn" to="/favourites">Favourites</router-link>
                <a v-show="isLoggedIn" @click="onLogout">Logout</a>
            </div>

            <div>
                <router-link v-show="!isLoggedIn" to="/login">Login</router-link>
                <router-link v-show="!isLoggedIn" to="/register">Register</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.state.user.token
            }
        },
        watch: {
            isLoggedIn() {
                // just for watching
            }
        },
        methods: {
            onLogout() {
                this.$emit('onLogout')
            }
        }
    }
</script>

<style lang="scss" scoped>
header {
    height: 60px;
    background: lightgray;

    nav {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    a {
        padding: 20px;
    }
}

.router-link-exact-active {
    border-bottom: solid 2px #3a8ee6;
}
</style>
