<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="image">
                <img :src="hotel.image" alt="">
            </div>
            <div class="content">
                <div class="header">
                    <div class="flex-it">
                        <a @click="openInNewWin(`/#/hotel/${hotel.id}`)">
                            <h2>{{hotel.name}} <small>{{hotel.city}} - {{hotel.country}}</small></h2>
                        </a>
                        <i style="margin: 20px; font-size: 25px" :class="checkIfFavourite(hotel.user) ? 'el-icon-star-on' : 'el-icon-star-off'" @click="setFavourite(hotel.id, hotel.user)"></i>
                    </div>
                    <el-rate v-model="hotel.stars" disabled></el-rate>
                </div>
                <div class="description">{{hotel.description}}</div>
                <div class="map">
                    <el-collapse v-if="hotel.location !== '' && details" v-model="activeMap" @change="handleChange">

                        <el-collapse-item title="Map" name="1">
                            <GmapMap
                            :center="{lat: +hotel.location.split(',')[0], lng: +hotel.location.split(',')[1]}"
                            :zoom="7"
                            map-type-id="terrain"
                            style="width: 500px; height: 300px"
                            >
                                <GmapMarker
                                    :key="index"
                                    :position="{lat: +hotel.location.split(',')[0], lng: +hotel.location.split(',')[1]}"
                                    :clickable="true"
                                    :draggable="true"
                                    @click="center={lat: +hotel.location.split(',')[0], lng: +hotel.location.split(',')[1]}"
                                />
                            </GmapMap>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="price"><h1>{{currency}}{{hotel.price}}</h1></div>
                <div class="footer">
                    <h4>{{formatDate()}}</h4>
                    <el-button @click="onGetReviews(hotel.id)">Show Reviews</el-button>
                </div>
            </div>
        </div>
        <el-collapse v-if="hotel.reviews.length !== 0" v-model="activeReviews" @change="handleChange">
            <el-collapse-item title="Reviews" name="1">
                <HotelReviews :reviews="hotel.reviews"></HotelReviews>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>

<script>
    import moment from 'moment'
    import HotelReviews from './HotelReviews'

    export default {
        components: {
            HotelReviews
        },
        props: ['hotel', 'details'],
        data() {
            return {
                activeReviews: ['1'],
                activeMap: ['0'],
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
            checkIfFavourite(users) {
                return users.includes(this.$store.state.user.user_id)
            },
            openInNewWin(location) {
                window.open(location, 'hotel', 'left=20,top=20,width=500,height=600,toolbar=1,resizable=0');
            },
            formatDate() {
                return moment(this.hotel.date).format('L HH:mm')
            },
            setFavourite(id, users) {
                this.$emit('onSetFavourite', {
                    hotel_id: id,
                    is_favorite: !this.checkIfFavourite(users)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/helpers';

    .box-card {
        margin-bottom: 20px;
    }

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

