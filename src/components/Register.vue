<template>
    <div class="main">
        <el-card @keyup.enter.native="onRegister()" class="register">
            <el-input placeholder="Username" v-model="register.username"></el-input>
            <el-input placeholder="Password" type="password" v-model="register.password"></el-input>
            <el-input placeholder="First Name" v-model="register.first_name"></el-input>
            <el-input placeholder="Last Name" v-model="register.last_name"></el-input>
            <el-input placeholder="Email" v-model="register.email"></el-input>
            <div class="buttons">
                <router-link to="/login">Sign In</router-link>
                <el-button type="primary" @click="onRegister()">Register</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import Service from "@/services/Service";
import Notifications from "@/services/Notifications";

export default {
    name: "register",
    components: {
        Service,
        Notifications
    },
    data() {
        return {
            register: {
                username: "",
                password: "",
                first_name: "",
                last_name: "",
                email: ""
            },
            notify: ""
        };
    },
    methods: {
        onRegister() {
            return Service.methods
                .post("register/", this.register)
                .then(response => {
                    if (response.data) {
                        Notifications.methods.emit('Success', 'Successfully registered', 'success')
                        this.$router.push('/login')
                    } else {
                        Notifications.methods.emit('Error', 'Something is wrong', 'error')
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    @import '../assets/styles/helpers';

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .register {
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
