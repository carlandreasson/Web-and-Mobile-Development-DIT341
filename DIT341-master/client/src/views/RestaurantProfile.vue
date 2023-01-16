<template>
  <body>
      <br>
      <b-container class="Restaurant Profile">
        <h2> Restaurant Profile </h2>
        <br>
        <b-row>
          <b-col>
            <restaurant-item :seats="getNumberOfSeats(this.currentRestaurant)" :name="currentRestaurant.name" :street="currentRestaurant.location.street" :number="currentRestaurant.location.number" :city="currentRestaurant.location.city"></restaurant-item>
            </b-col>
        <b-col>
         <edit-restaurant @update-restaurant="getRestaurantInfo" :id="this.currentRestaurant._id" :tables="this.currentRestaurant.tables" :name="this.currentRestaurant.name" :street="this.currentRestaurant.location.street" :number="this.currentRestaurant.location.number" :city="this.currentRestaurant.location.city"/>
        </b-col>
        <b-col><restaurant-menu/></b-col>
        </b-row>
      </b-container>
      <br><br>
  </body>
</template>

<script>
import { Api } from '@/Api'
import RestaurantMenu from '@/components/restaurantMenu.vue'
import RestaurantItem from '@/components/restaurantItem.vue'
import EditRestaurant from '@/components/editRestaurant.vue'
export default {
  components: { RestaurantMenu, RestaurantItem, EditRestaurant },
  mounted() {
    console.log('Retrieving restaurant in DB')
    // this.id = this.$route.params.customerId // save the id attribute as the id in the url using the route.
    Api.get(`/restaurants/${this.$route.params.restaurantId}`) // gives the id previsouly retrieved from the url to the get function as a parameter
      .then(response => {
        this.currentRestaurant = response.data
        console.log('Restaurant found with id ' + this.$route.params.restaurantId)
      })
      .catch(error => {
        console.log(error)
        alert('Restaurant not found')
      })
  },
  data() {
    return {
      currentRestaurant: {
        name: '',
        location: {
          street: '',
          number: null,
          city: ''
        },
        tables: []
      }
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
    getRestaurantInfo() {
      Api.get(`/restaurants/${this.$route.params.restaurantId}`) // gives the id previsouly retrieved from the url to the get function as a parameter
        .then(response => {
          this.currentRestaurant = response.data
          console.log('Restaurant found with id ' + this.$route.params.restaurantId)
        })
        .catch(error => {
          console.log(error)
          alert('Restaurant not found')
        })
    }
  }
}
</script>

<style>
button {
    box-shadow: 0 6px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    transition-duration: 0.4s;
    background-color: #52a55c;
    border-radius: 8px;
    width: 50%;
    display: inline-block;
    vertical-align: top;
}

button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: #52a55c;
    color: white;
}

</style>
