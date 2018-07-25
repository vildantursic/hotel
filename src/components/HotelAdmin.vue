<template>
    <div class="main">
        <el-card class="form">
            <el-form :model="hotelData">
                <el-input placeholder="Name" v-model="hotelData.name"></el-input>
                <el-input-number v-model="hotelData.price"></el-input-number>
                <!-- <el-input placeholder="Location" v-model="hotelData.location"></el-input> -->
                <GmapMap
                :center="hotelData.location"
                :zoom="7"
                map-type-id="terrain"
                style="width: 500px; height: 300px"
                >
                    <GmapMarker
                        :key="index"
                        :position="hotelData.location"
                        :clickable="true"
                        :draggable="true"
                        @click="center=hotelData.location"
                    />
                </GmapMap>
                <el-input placeholder="Country" v-model="hotelData.country"></el-input>
                <el-input placeholder="City" v-model="hotelData.city"></el-input>
                <div class="block">
                    <span class="demonstration">Stars</span>
                    <el-rate v-model="hotelData.stars"></el-rate>
                </div>
                <el-input placeholder="Description" v-model="hotelData.description"></el-input>
                <div class="buttons">
                    <el-button type="primary" @click="onCreate()">Create</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Notifications from '@/services/Notifications'
import Service from '@/services/Service'

export default {
  name: 'hotel-admin',
  components: {
    Service,
    Notifications
  },
  data() {
    return {
        hotelData: {
            stars: 4,
            country: 'Serbia',
            city: 'Belgrade',
            location: { lat: 43, lng: 18 },
            name: 'Art Hotel',
            description: `
                Featuring an on-site restaurant and Situated on Belgrade's
                impressive pedestrian street and shopping zone, Art Hotel's décor
                is inspired by Italian style. The property offers individually designed,
                air-conditioned rooms and suites with minibar, free high-speed WiFi, free sauna and hairdryers ...
            `,
            price: '40.25',
            user: ['1']
        }
    }
  },
  methods: {
    onCreate() {
        this.hotelData.location = `${this.hotelData.location.lat}, ${this.hotelData.location.lng}`
        Service.methods
                .post(`hotel_api/`, this.hotelData)
                .then(response => {
                    if (response.data) {
                        Notifications.methods.emit('Success', 'Successfully created hotel', 'success')
                        this.$router.push('/')
                    } else {
                        Notifications.methods.emit('Error', 'Something went wrong', 'error')
                    }
                });
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../assets/styles/helpers';

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form {
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
