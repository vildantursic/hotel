<template>
    <div class="main">
        <h1>Favourites</h1>
        <el-button type="primary" @click="getHotels()" v-loading.fullscreen.lock="loading">{{loading ? 'laoding ...' : 'Get Fav Hotels'}}</el-button>
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
import HotelCard from "@/components/shared/HotelCard";

export default {
  name: "favourites",
  components: {
    Service,
    HotelCard
  },
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.getHotels();
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
      Service.methods.get("favorites").then(response => {
        this.$store.commit("setFavouriteHotels", response.data);
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
