<template>

<div class="list-group">
  <button type="button" class="list-group-item list-group-item-action disabled">
    Customer Options
  </button>
  <b-list-group-item v-on:click="goToRestaurants" button>View Restaurants</b-list-group-item>
  <b-list-group-item v-on:click="goToReservations" button>Your Reservations</b-list-group-item>
  <br>
  <button v-on:click="logOut" href="/" role="button" class="list-group-item list-group-item-action" >Log Out</button>
  <b-list-group-item v-on:click="deleteAccount" button>Delete account</b-list-group-item>

</div>
</template>

<script>
import { Api } from '@/Api'

export default {

  methods: {
    goToRestaurants() {
      this.$router.push({ name: 'restaurants' })
    },
    goToReservations() {
      this.$router.push({ name: 'reservations', params: { customerId: this.$route.params.customerId } })
    },
    deleteAccount() {
      Api.delete(`/customers/${this.$route.params.customerId}`)
        .then(response => {
          alert('Customer ' + response.data.name + ' has been deleted successfully.')
          console.log('Customer deleted with id ' + this.$route.params.customerId)
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log(error)
          alert('Customer not found')
        })
    },
    logOut() {
      localStorage.setItem('currentUserID', '')
      localStorage.setItem('currentUserProfile', '')
      this.$router.push({ name: 'home' })
    }

  }
}

</script>
