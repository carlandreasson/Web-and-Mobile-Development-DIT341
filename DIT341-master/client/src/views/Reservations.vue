<template>
  <body>
    <br>
      <b-row>
        <b-col></b-col>
        <b-col><h2 class='mx-auto'>Reservations</h2></b-col>
         <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col v-for="reservation in reservations" v-bind:key="reservation.id">
          <reservation-item :tableNumber="this.newReservation.tableNumber" :seats="this.newReservation.seats"/>
        </b-col>
        <b-col></b-col>
      </b-row>
      <br>
  </body>
</template>

<script>
import ReservationItem from '@/components/reservationItem.vue'
import { Api } from '@/Api'

export default {
  components: { ReservationItem },
  mounted() {
    console.log('Retrieving reservations from DB')
    Api.get('/reservations')
      .then(response => {
        this.reservations = response.data.reservations
        console.log(this.reservations)
        console.log('All reservations have been retrieved')
      })
      .catch(error => {
        console.log(error)
        alert('Reservation not found')
      })
  },
  data() {
    return {
      reservations: [],
      newReservation: {
        tableNumber: null,
        seats: null
      }
    }
  },
  methods: {
    createReservation() {
      Api.post(`/restaurants/${this.$route.params.restaurantId}/reservations`, this.newReservation)
        .then(response => {
          alert('You are now creating reservation with id: ' + response.data._id + '')
          console.log('Status: ' + response.status)
          this.newReservation.tableNumber = null
          this.newReservation.seats = null
        })
        .catch(error => {
          console.log(error)
          alert('Something went wrong. Contact the administrator of the website')
        })
    }
  }
}

</script>
