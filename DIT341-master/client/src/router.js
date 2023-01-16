import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RestReg from './views/RestaurantReg.vue'
import CustomerReg from './views/CustomerReg.vue'
import SignIn from './views/SignIn.vue'
import Restaurants from './views/Restaurants.vue'
import CustomerProfile from './views/CustomerProfile.vue'
import RestaurantProfile from './views/RestaurantProfile.vue'
import Reservations from './views/CustomerReservations.vue'
import Tables from './views/Tables.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/CustomerRegistration',
      name: 'signUpCustomer',
      component: CustomerReg
    },
    {
      path: '/RestaurantRegistration',
      name: 'signUpRestaurant',
      component: RestReg
    },
    {
      path: '/SignIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/customers/:customerId',
      name: 'customerProfile',
      component: CustomerProfile
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/:restaurantId',
      name: 'restaurantProfile',
      component: RestaurantProfile
    },
    {
      path: '/restaurants/:restaurantId/tables',
      name: 'tables',
      component: Tables
    },
    {
      path: '/customers/:customerId/reservations',
      name: 'reservations',
      component: Reservations
    },
    {
      path: '/about',
      name: 'about',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Home
    }
  ]
})
