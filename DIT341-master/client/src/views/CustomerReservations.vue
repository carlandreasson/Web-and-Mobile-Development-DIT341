<template>
  <body>
      <br>
      <h2> Your reservations</h2>
      <br>
      <p v-show="!hasReservations"> You have no reservations to display. </p>
      <b-row align-h="start">
          <b-col v-for="reservation in this.reservations" v-bind:key="reservation._id" cols="12" sm="6" md="4">
            <reservation-item :table="reservation.table.number" :restaurant="reservation.restaurant.name"></reservation-item>
          </b-col>
        </b-row>
      <br>
      <b-col></b-col>
      <br><br><br>
  </body>
</template>

<script>
import ReservationItem from '@/components/reservationItem.vue'
import { Api } from '@/Api'

export default {
  components: { ReservationItem },
  mounted() {
    console.log('Retrieving reservations from DB')
    Api.get(`/customers/${this.$route.params.customerId}/reservations`)
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
    hasReservations() {
      return this.reservations.lenght()
    }
  }
}

</script>
