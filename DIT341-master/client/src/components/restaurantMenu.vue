<template>

<div class="list-group">
  <button type="button" class="list-group-item list-group-item-action disabled">
     Restaurant Options
  </button>
  <b-list-group-item v-on:click="goToTables" button>Tables</b-list-group-item>
  <b-list-group-item v-on:click="goToReservations" button>Reservations</b-list-group-item>
  <br>
  <button v-on:click="logOut" role="button" class="list-group-item list-group-item-action" >Log Out</button>
  <b-list-group-item v-on:click="deleteAccount" button>Delete account</b-list-group-item>

</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  methods: {
    goToTables() {
      this.$router.push({ name: 'tables', params: { restaurantId: this.$route.params.restaurantId } })
    },
    goToReservations() {
      this.$router.push({ name: 'reservations', params: { restaurantId: this.$route.params.restaurantId } })
    },
    deleteAccount() {
      Api.delete(`/restaurants/${this.$route.params.restaurantId}`)
        .then(response => {
          alert('Restaurant ' + response.data.name + ' has been deleted successfully.')
          console.log('Restaurant deleted with id ' + this.$route.params.restaurantId)
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log(error)
          alert('Restaurant not found')
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
