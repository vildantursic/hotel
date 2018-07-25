<template>
    <div>
      <h1>Dashboard</h1>
      <el-button type="primary" @click="getHotes()">{{loading ? 'laoding ...' : 'Get Hotels'}}</el-button>
      <div>
        <HotelCard v-for="(hotel, i) in hotels" :key="i"
            :hotel="hotel"
            @onGetReviews="getReviews($event)"
            @onFavouriteClick="setFavourite($event)"/>
      </div>
    </div>
</template>

<script>
import Service from "@/services/Service";
import Notifications from "@/services/Notifications";
import HotelCard from "@/components/shared/HotelCard";

export default {
  name: "dashboard",
  components: {
    Service,
    Notifications,
    HotelCard
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    hotels() {
      return this.$store.state.hotels;
    }
  },
  watch: {
    hotels() {}
  },
  methods: {
    getHotes() {
      this.loading = true;
      Service.methods.get("hotel_api").then(response => {
        this.$store.commit("setHotels", response.data);
        // Notifications.methods.emit('Error', response, 'error')
        this.loading = false;
      });
    },
    getReviews(id) {
      Service.methods.get(`hotel_api/get_hotel_reviews/${id}`).then(response =>
        this.$store.commit("setReviews", {
          id: id,
          reviews: response.data
        })
      );
    },
    setFavourite(data) {
      Service.methods
        .post("favorites/add_remove", data)
        .then(() => this.getHotels());
    }
  }
};
</script>

<style scoped>
</style>
