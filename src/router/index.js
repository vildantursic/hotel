import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { store } from '../store/index'

import Dashboard from '@/components/Dashboard'
import HotelDetails from '@/components/HotelDetails'
import HotelAdmin from '@/components/HotelAdmin'
import Favourites from '@/components/Favourites'
import Register from '@/components/Register'
import Login from '@/components/Login'

const routes = [
  { path: '/', component: Dashboard, meta: { conditionalRoute: true } },
  { path: '/hotel/:id', component: HotelDetails, meta: { conditionalRoute: true } },
  { path: '/create', component: HotelAdmin, meta: { conditionalRoute: true } },
  { path: '/favourites', component: Favourites, meta: { conditionalRoute: true } },
  { path: '/register', component: Register, meta: { conditionalRoute: false } },
  { path: '/login', component: Login, meta: { conditionalRoute: false } }
]

export const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => { 
    if (to.matched.some(record => record.meta.conditionalRoute)) { 
        if (store.state.user.token === '') { 
            next({ path: '/login' }) 
        } else { 
            next() 
        } 
    } else { 
        next()
    } 
}) 