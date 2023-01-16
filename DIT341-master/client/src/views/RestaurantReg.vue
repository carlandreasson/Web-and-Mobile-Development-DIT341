<template>
  <body>
      <div>
        <h3>Sign Up Form</h3>
        <b-row>
            <b-col></b-col><b-col>
              <b-form-input placeholder= "Name" list="input-list" id="input-with-list" v-model="newRestaurant.name"></b-form-input>
            <br>
              <b-form-input placeholder= "City" list="input-list" id="input-with-list" v-model="newRestaurant.location.city"></b-form-input>
            <br>
              <b-form-input placeholder= "Street" list="input-list" id="input-with-list" v-model="newRestaurant.location.street"></b-form-input>
            <br>
              <b-form-input placeholder= "Number" list="input-list" id="input-with-list" v-model="newRestaurant.location.number"></b-form-input>
            </b-col><b-col></b-col>
        </b-row>
            <br>
        <div class="Button" style="text-align:center">
          <b-button variant= "success" type ="submit" v-on:click="register">Register</b-button>
        </div>
      <br><br><br>
    </div>
  </body>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      newRestaurant: {
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
    register() {
      localStorage.clear()
      Api.post('/restaurants', this.newRestaurant)
        .then(response => {
          alert('You are now registered with the id ' + response.data._id + '. Please note it down in order to login.')
          console.log('Status: ' + response.status)
          localStorage.setItem('currentUserID', response.data._id)
          localStorage.setItem('currentUserProfile', 'restaurants')
          this.newRestaurant.name = ''
          this.newRestaurant.location.city = ''
          this.newRestaurant.location.street = ''
          this.newRestaurant.location.number = null
          this.newRestaurant.tables = []
          this.$router.push({ name: 'restaurantProfile', params: { restaurantId: response.data._id } })
        })
        .catch(error => {
          console.log(error)
          alert('Something went wrong. Contact the administrator of the website')
        })
    }
  }
}

</script>

<style scoped>
h1 {text-align: center;}
h3 {text-align: center;
    font-family:'Roboto', sans-serif;
    color: #52a55c;
    }
p {text-align: center;}
div {text-align: center;}
form{text-align: center;}

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

input{
    background-color: rgb(255, 255, 255);
}
button {
    box-shadow: 0 6px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    transition-duration: 0.4s;
    background-color: #52a55c;
    border-radius: 8px;
    width: 20%;
    display: inline-block;
    vertical-align: top;
}

button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: #52a55c;
    color: white;
}
</style>
