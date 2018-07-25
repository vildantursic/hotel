<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="image">
                <img :src="hotel.image" alt="">
            </div>
            <div class="content">
                <div class="header">
                    <router-link :to="`/hotel/${hotel.id}`">
                        <h2>{{hotel.name}} <small>{{hotel.city}} - {{hotel.country}}</small></h2>
                    </router-link>
                    <i v-if="checkIfFav" class="el-icon-star-on"></i>
                    <i v-if="!checkIfFav" class="el-icon-star-off"></i>
                    <el-rate v-model="hotel.stars" disabled></el-rate>
                </div>
                <div class="description">{{hotel.description}}</div>
                <div class="price"><h1>{{currency}}{{hotel.price}}</h1></div>
                <div class="footer">
                    <h4>{{formatDate()}}</h4>
                    <el-button @click="onGetReviews(hotel.id)">Show Reviews</el-button>
                </div>
            </div>
        </div>
        <el-collapse v-if="hotel.reviews.length !== 0" v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Reviews" name="1">
                <HotelReviews :reviews="hotel.reviews"></HotelReviews>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>

<script>
    import moment from 'moment'
    import { find } from 'lodash'
    import HotelReviews from './HotelReviews'

    export default {
        components: {
            HotelReviews
        },
        props: ['hotel'],
        data() {
            return {
                activeNames: ['1'],
                showReviews: true,
                currency: '$'
            }
        },
        methods: {
            handleChange() {
            },
            onGetReviews(id) {
                this.$emit('onGetReviews', id)
            },
            checkIfFav() {
                return !!find(this.hotel.user, this.$store.user.user_id)
            },
            openInNewWin(location) {
                window.open(location, 'hotel', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
            },
            formatDate() {
                return moment(this.hotel.date).format('L HH:mm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/helpers';

    .clearfix {
        display: flex;

        @media (max-width: 768px) {
            flex-direction: column;

            .image {
                width: unset !important;
                padding: 0;
            }
            .content {
                width: calc(100% - 40px) !important;
            }
        }

        .image {
            width: 30%;
            
            img {
                width: 100%;
            }
        }
        .content {
            width: calc(70% - 40px);
            padding: 0 20px;

            .header {
                @extend .flex-it;

                h2 {
                    display: flex;
                    flex-direction: column;

                    small {
                        font-size: .7em;
                        opacity: 0.7;
                    }
                }
            }
            .description {

            }
            .price {
                display: flex;
                justify-content: flex-end;
            }
            .footer {
                @extend .flex-it;

            }
        }
    }
</style>

