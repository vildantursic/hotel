<script>
    import { Notification } from 'element-ui';

    export default {
        components: {
            Notification
        },
        methods: {
            emit(title, message, type) {
                Notification({
                    title,
                    message,
                    type
                });
            }
        }
    }
</script>