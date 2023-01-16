<template>
  <body>
      <br>
      <h2> Restaurants near you! </h2>
      <br>
      <b-row align-h="start">
          <b-col v-for="restaurant in this.restaurants" v-bind:key="restaurant._id" cols="12" sm="6" md="4">
            <restaurant-item @go-to="displayTables(restaurant._id)" class="d-flex align-items-center justify-content-center" :isCustomer="isCustomer" :name="restaurant.name" :city="restaurant.location.city" :number="restaurant.location.number" :street="restaurant.location.street" :seats="getNumberOfSeats(restaurant)"></restaurant-item>
          </b-col>
        </b-row>
      <br>
      <b-col></b-col>
      <br><br><br>
  </body>
</template>

<script>
import { Api } from '@/Api'

import RestaurantItem from '../components/restaurantItem.vue'
export default {
  components: { RestaurantItem },
  mounted() {
    if (localStorage.getItem('currentUserProfile') === 'customers') {
      this.isCustomer = true
    } else {
      this.isCustomer = false
    }
    console.log('Retrieving restaurants from DB')
    Api.get('/restaurants')
      .then(response => {
        this.restaurants = response.data.restaurants
        console.log(this.restaurants)
        console.log('All restaurants have been retrieved')
      })
      .catch(error => {
        console.log(error)
        alert('Restaurants not found')
      })
  },
  data() {
    return {
      restaurants: [],
      isCustomer: null
    }
  },
  methods: {
    getNumberOfSeats: function (restaurant) {
      let numberOfSeats = 0
      restaurant.tables.forEach(table => {
        numberOfSeats += table.seats
      })
      return numberOfSeats
    },
    displayTables(restaurantId) {
      this.$router.push({ name: 'tables', params: { restaurantId: restaurantId } })
    }
  }
}
</script>

<style scoped>
h1 {text-align: center;}
h2 {text-align: center; font-family: 'Roboto', sans-serif; color: #52a55c; }
h3 {text-align: center; font-family: 'Roboto', sans-serif; color: #52a55c; }
p {text-align: center;}
div {text-align: center;}
form{text-align: center;}

input{
    background-color: rgb(255, 255, 255);
}
button {
    box-shadow: 0 6px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    transition-duration: 0.4s;
    background-color: #52a55c;
    border-radius: 8px;
    width: 100%;

}
button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: #52a55c;
    color: white;
}
.img {
    background: url('/assets/seatr-logo.png');
    width: 33.33%;
    height: auto;
}
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
#seatr{
    background-color: #52a55c;
    padding:50px;
}
#info{
    background-color: #52a55c;
    width: 100%;
    height: 100%;
    padding:20px;
}
#app{
  background-color: #52a55c;
}
#deck1{
width: 33.33% ;
}
#deck2{
width:33.33%
}
#deck3{
  width: 33.33%;
}
</style>
