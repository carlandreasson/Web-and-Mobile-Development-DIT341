<template>
  <body>
      <br>
        <h3>Log In</h3>
        <br>
        <b-row>
          <b-col></b-col><b-col>
          <b-form-input placeholder= "Identification Number" list="input-list" id="input-with-list" v-model="identificationNumber"></b-form-input>
          <br>
          <div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="profile type"
            ></b-form-radio-group>
          </b-form-group>
          </div>
          <div class="Sign-in-Button" style="text-align:center" v-on:click="signIn">
          <b-button variant="success">Log In</b-button>
          </div>
          </b-col><b-col></b-col>
        </b-row>
      <br><br><br>
  </body>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      selected: null,
      options: [
        { text: 'I am a customer', value: 'customers' },
        { text: 'I am a restaurant', value: 'restaurants' }
      ],
      identificationNumber: ''
    }
  },
  methods: {
    signIn() {
      localStorage.clear()
      if (this.selected === null) {
        alert('Please select a type of user')
      } else {
        Api.get(`/${this.selected}/${this.identificationNumber}`)
          .then(response => {
            console.log('Profile found with id ' + this.id)
            console.log('Status: ' + response.status)
            alert('Welcome ' + response.data.name)
            this.identificationNumber = null
            localStorage.setItem('currentUserID', response.data._id)
            localStorage.setItem('currentUserProfile', this.selected)
            console.log(localStorage.getItem('currentUserID') + '' + localStorage.getItem('currentUserProfile'))
            if (this.selected === 'customers') {
              this.$router.push({ name: 'customerProfile', params: { customerId: response.data._id } })
            }
            if (this.selected === 'restaurants') {
              this.$router.push({ name: 'restaurantProfile', params: { restaurantId: response.data._id } })
            }
          })
          .catch(error => {
            console.log(error)
            alert('Profile not found')
          })
      }
    }
  }
}

</script>

<style scoped>
h1 {text-align: center;}
h3 {text-align: center; font-family: 'Roboto', sans-serif; color: #52a55c; }
p {text-align: center;}
div {text-align: center;}
form{text-align: center;}

button {
    box-shadow: 0 6px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    transition-duration: 0.4s;
    background-color:#52a55c;
    border-radius: 8px;
    width: 40%;
    display: inline-block;
    vertical-align: top;
}
button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: #52a55c;
    color: white;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
#app{
  background-color: #52a55c;
}
</style>
