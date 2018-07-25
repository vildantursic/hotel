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
        setFavouriteHotels(state, payload) {
            state.hotels = payload.map(hotel => {
                hotel['reviews'] = []
                return hotel
            }).filter(hotel => {
                if (hotel.user) {
                    return hotel.user.includes(state.user.user_id) ? hotel : null
                } else {
                    return null
                }
            })
        },
        setHotel(state, payload) {
            payload['reviews'] = []
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