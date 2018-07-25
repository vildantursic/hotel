<template>
    <div>
      <div v-if="hotel"> 
        <HotelCard :hotel="hotel"
                   :reviews="hotel"
                   @onGetReviews="getReviews($event)"/>
      </div>
    </div>
</template>

<script>
import Service from '@/services/Service'
import HotelCard from '@/components/shared/HotelCard'

export default {
  name: 'hotel-details',
  components: {
    Service,
    HotelCard
  },
  data() {
    return {
    }
  },
  created() {
      this.getHotes()
  },
  computed: {
    hotel() {
      return this.$store.state.hotel
    },
    reviews() {
      return this.$store.state.hotel
    }
  },
  watch: {
    hotel() {},
  },
  methods: {
    getHotes() {
      Service.methods
             .get(`hotel_api/${this.$route.params.id}`)
             .then(response => this.$store.commit('setHotel', response.data));
    },
    getReviews(id) {
      Service.methods
             .get(`hotel_api/get_hotel_reviews/${id}`)
             .then(response => this.$store.commit('setReviews', {
               id: id,
               reviews: response.data
             }));
    }
  }
}
</script>

<style scoped>

</style>
