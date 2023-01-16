<template>
  <body>
    <br>
      <b-row>
        <h2 class='mx-auto'>Tables</h2>
        </b-row>
        <b-row>
        <p v-show="!hasTables">There is no table registered yet.</p>
        <br>
        <b-col v-for="table in tables" :key="table._id" cols="12" sm="6" md="4" align-h="start">
          <table-item @book-table="createReservation(table)" @delete-this-table="deleteATable(table)" :isCustomer="isCustomer" :number="table.number" :seats="table.seats" :available="table.available"></table-item>
        </b-col>
        <b-col></b-col>
        </b-row>
        <b-row>
        <b-col></b-col>
        <b-col style="width:auto;" align="center">
        <b-button  v-show="!isCustomer" v-on:click="createTable" class="btn btn-success">Create Table</b-button>
        <br>
        <br>
        <b-button  v-show="!isCustomer" v-on:click="deleteAllTables" class="btn btn-danger">Delete All Tables</b-button>
        <br>
        <br>
        <b-button v-on:click="getAllTables" :pressed.sync="sortingActive" variant="success">Sort by seats (descending)</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
      <br>
      <br>
  </body>
</template>

<script>
import TableItem from '@/components/tableItem.vue'
import { Api } from '@/Api'

export default {
  components: { TableItem },
  mounted() {
    if (localStorage.getItem('currentUserProfile') === 'customers') {
      this.isCustomer = true
    } else {
      this.isCustomer = false
    }
    console.log('Retrieving tables from DB')
    Api.get(`/restaurants/${this.$route.params.restaurantId}/tables`)
      .then(response => {
        this.tables = response.data.tables
        console.log(this.tables)
        console.log('All tables have been retrieved')
      })
      .catch(error => {
        console.log(error)
        alert('Tables not found')
      })
  },
  data() {
    return {
      isCustomer: null,
      tables: [],
      newTable: {
        number: null,
        seats: null,
        available: true,
        restaurant: null
      },
      newReservation: {
        table: '',
        restaurant: '',
        customer: ''
      },
      ordering: '',
      sortingActive: false
    }
  },
  methods: {
    getAllTables() {
      this.sorting()
      Api.get(`/restaurants/${this.$route.params.restaurantId}/tables${this.ordering}`)
        .then(response => {
          this.tables = response.data.tables
          console.log(this.tables)
          console.log('All tables have been retrieved')
        })
        .catch(error => {
          console.log(error)
          alert('Tables not found')
        })
    },
    sorting() {
      if (this.sortingActive) {
        this.ordering = '?sort=-seats'
      } else {
        this.ordering = ''
      }
    },
    createTable() {
      Api.post(`/restaurants/${this.$route.params.restaurantId}/tables`, this.newTable)
        .then(response => {
          alert('You are now creating table with id: ' + response.data._id + '')
          console.log('Status: ' + response.status)
          this.newTable.number = null
          this.newTable.seats = null
          this.newTable.available = true
        })
        .catch(error => {
          console.log(error)
          alert('Something went wrong. Contact the administrator of the website')
        })
        .finally(() => {
          this.getAllTables()
        }
        )
    },
    deleteAllTables() {
      Api.delete(`/restaurants/${this.$route.params.restaurantId}/tables`)
        .then(response => {
          alert('You are now deleting all tables for your restaurant')
          console.log('Status: ' + response.status)
          this.tables = []
        })
        .catch(error => {
          console.log(error)
          alert('Something went wrong. Contact the administrator of the website')
        })
        .finally(() => {
          this.getAllTables()
        }
        )
    },
    hasTables() {
      if (this.tables.length() === 0) {
        return false
      } else {
        return true
      }
    },
    deleteATable(table) {
      const currentTableId = table._id
      Api.delete(`/restaurants/${this.$route.params.restaurantId}/tables/${currentTableId}`)
        .then(response => {
          alert('Customer ' + response.data.name + ' has been deleted successfully.')
          console.log('Table deleted with id ' + response.data._id)
        })
        .catch(error => {
          console.log(error)
          alert('Table not found')
        })
        .finally(() => {
          this.getAllTables()
        }
        )
    },
    createReservation(table) {
      this.getNewReservation(table)
      console.log('New reservation created' + this.newReservation)
      Api.post(`/customers/${localStorage.getItem('currentUserID')}/reservations`, this.newReservation)
        .then(response => {
          console.log('Status: ' + response.status)
          this.newReservation.restaurant = ''
          this.newReservation.table = ''
          this.newReservation.customer = ''
        })
        .catch(error => {
          console.log(error)
          alert('Something went wrong. Contact the administrator of the website')
        })
        .finally(() => {
          this.getAllTables()
        }
        )
    },
    getNewReservation(table) {
      this.newReservation.restaurant = this.$route.params.restaurantId
      this.newReservation.table = table._id
      this.newReservation.customer = localStorage.getItem('currentUserID')
    }
  }
}
</script>
<style scoped>
h2 {text-align: center; font-family:'Roboto', sans-serif;}

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
.button {
    box-shadow: 0 6px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    transition-duration: 0.4s;
    background-color: red;
    border-radius: 8px;
    width: auto;
    vertical-align: top;
}

.button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: #52a55c;
    color: white;
}
.btn-danger{
background-color: red;
}
</style>
