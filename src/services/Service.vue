<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
    import { store } from '../store/index'
    import Notifications from '@/services/Notifications'

    export default {
        components: {
            Notifications
        },
        data() {
            return {
                api: 'http://localhost:8000',
            }
        },
        computed: {
            ...mapGetters([
                'token'
            ])
        },
        methods: {
            headers() {
                if (store.state.user.token) {
                    return {
                        headers: {
                            'Authorization': `Token ${store.state.user.token}`
                        }
                    }
                } else {
                    return {}
                }
            },
            get(route) {
                return axios.get(`http://localhost:8000/${route}`, this.headers())
            },
            post(route, data) {
                return axios.post(`http://localhost:8000/${route}`, data, this.headers())
            },
            put(route, data) {
                return axios.put(`http://localhost:8000/${route}`, data, this.headers())
            },
            delete(route) {
                return axios.delete(`http://localhost:8000/${route}`, this.headers())
            }
        }
    }
</script>