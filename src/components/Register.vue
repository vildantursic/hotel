<template>
    <div>
        <el-input placeholder="Username" v-model="register.username"></el-input>
        <el-input placeholder="Password" type="password" v-model="register.password"></el-input>
        <el-input placeholder="First Name" v-model="register.first_name"></el-input>
        <el-input placeholder="Last Name" v-model="register.last_name"></el-input>
        <el-input placeholder="Email" v-model="register.email"></el-input>
        <router-link to="/login">Sign In</router-link>
        <el-button type="primary" @click="onRegister()">Register</el-button>
        {{notify}}
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
                username: "vildan.tursic",
                password: "test123",
                first_name: "Vildan",
                last_name: "Tursic",
                email: "vildantursic@hotmail.com"
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
                    } else {
                        Notifications.methods.emit('Error', 'Something is wrong', 'error')
                    }
                });
        }
    }
};
</script>

<style scoped>
</style>
