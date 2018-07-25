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
            get(route) {
                return axios.get(`http://localhost:8000/${route}`, {
                    headers: {
                        'Authorization': `Token ${store.state.user.token}`
                    }
                })
            },
            post(route, data) {
                return axios.post(`http://localhost:8000/${route}`, data)
            },
            put(route, data) {
                return axios.put(`http://localhost:8000/${route}`, data)
            },
            delete(route) {
                return axios.delete(`http://localhost:8000/${route}`)
            }
        }
    }
</script>