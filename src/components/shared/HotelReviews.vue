<template>
    <div>
        <div v-if="reviews !== []" v-for="(review, i) in reviews" :key="i" class="review">
            <div class="image">
                <img class="rounded" src="../../assets/user.png" alt="">
            </div>
            <div class="content">
                <div class="user-info">
                    <h2>{{review.author.first_name}} {{review.author.last_name}}</h2>
                    <i :class="returnPositivity(review)"></i>
                </div>
                <div class="message">{{review.message}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['reviews'],
        methods: {
            returnPositivity(review) {
                return review.positive ? 'el-icon-arrow-up green' : 'el-icon-arrow-down red'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/helpers';

    .review {
        display: grid;
        grid-template-columns: 10% 80%;
        grid-template-rows: 100px 100px;
        grid-template-areas: 'image content'
                            'image message';
        border-bottom: solid 2px lightgray;
        margin-bottom: 20px;

        .image {
            grid-area: image;
            @extend .flex-it;

            img {
                width: 110px;
                height: 100px;
            }
        }
        .content {
            grid-area: content;
            padding: 20px;

            .user-info {
                @extend .flex-it;
                
                i {
                    font-size: 1.5em;
                }
            }
        }
        .message {
            grid-area: message;
            padding: 20px;
        }
    }


    .rounded {
        border-radius: 50%;
    }
    .green {
        color: green;
    }
    .red {
        color: red;
    }
</style>
