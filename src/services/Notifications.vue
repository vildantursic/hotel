<script>
    import { Notification } from 'element-ui';

    export default {
        components: {
            Notification
        },
        methods: {
            emit(title = 'Info', message = '...', type = 'info') {
                Notification({
                    title,
                    message,
                    type
                });
            }
        }
    }
</script>