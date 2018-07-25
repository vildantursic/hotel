import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";

export const store = new Vuex.Store({
    state: {
        user: {},
        hotels: [],
        hotel: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setHotels(state, payload) {
            state.hotels = payload.map(hotel => {
                hotel['reviews'] = []
                return hotel
            })
        },
        setHotel(state, payload) {
            state.hotel = payload
        },
        setReviews(state, payload) {
            state.hotels = state.hotels.map(hotel => {
                if (payload.id === hotel.id) {
                    hotel['reviews'] = payload.reviews
                } else {
                    hotel['reviews'] = []
                }
                return hotel
            })
        },
        clearUser(state) {
            state.user = {},
            state.hotel = {},
            state.hotels = []
        }
    },
    getters: {
        token: state => state.user.token
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })]
})