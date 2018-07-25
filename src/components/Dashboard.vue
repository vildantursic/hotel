<template>
    <div class="main">
      <h1>Dashboard</h1>
      <el-button type="primary" @click="getHotels()" v-loading.fullscreen.lock="loading">{{loading ? 'laoding ...' : 'Get Hotels'}}</el-button>
      <div>
        <HotelCard v-for="(hotel, i) in hotels" :key="i"
            :hotel="hotel"
            @onGetReviews="getReviews($event)"
            @onSetFavourite="setFavourite($event)"/>
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
  created() {
	this.getHotels()
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
    getHotels() {
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
		.then((response) => {
			Notifications.methods.emit('Success', response.data.Message , 'success')
			this.getHotels()
		});
    }
  }
};
</script>

<style scoped>
</style>
