<template>
  <div>
    <b-card
      v-bind:title="name"
      img-src="https://static1.squarespace.com/static/58764f353a0411deadd19726/t/587f70a2b8a79bac6fdbfa78/1484746950506/"
      img-alt="Image"
      img-top
      tag="article"
      style= "max-width: 20rem;"
      class="mb-2"
      align="center"
    >
      <b-card-text>
      <h2> Edit Profile </h2>
          <h6 class="form-label" for="customFile">change picture</h6>
          <input type="file" class="form-control" id="profilepic" />
          <br>
          <b-form-input v-model="updatedRestaurant.name" placeholder="Name"></b-form-input>
          <br>
          <b-form-input v-model="updatedRestaurant.location.city" placeholder="City"></b-form-input>
          <br>
          <b-form-input v-model="updatedRestaurant.location.number" placeholder="Street number"></b-form-input>
          <br>
          <b-form-input v-model="updatedRestaurant.location.street" placeholder="Street"></b-form-input>
          <br>
          <b-button v-on:click="edit" variant="success">Save</b-button>
      </b-card-text>

    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  props: {
    name: {
      type: String
    },
    street: {
      type: String
    },
    city: {
      type: String
    },
    number: {
      type: Number
    },
    seats: {
      type: Number
    },
    id: {
      type: String
    },
    tables: {
      type: Array
    }
  },
  data() {
    return {
      updatedRestaurant: {
        name: '',
        location: {
          street: '',
          number: null,
          city: ''
        },
        tables: [],
        id: ''
      }
    }
  },
  methods: {
    edit() {
      this.constructUpdatedObject()
      console.log(this.updatedRestaurant)
      Api.put(`/restaurants/${this.$route.params.restaurantId}`, this.updatedRestaurant)
        .then(response => {
          console.log('Restaurant updated with id ' + this.$route.params.restaurantId)
        })
        .catch(error => {
          console.log(error)
          alert('Restaurant not found')
        })
        .finally(() => {
          this.updatedRestaurant.name = ''
          this.updatedRestaurant.id = ''
          this.updatedRestaurant.tables = []
          this.updatedRestaurant.location.street = ''
          this.updatedRestaurant.location.city = ''
          this.updatedRestaurant.location.number = null
          this.$emit('update-restaurant')
        })
    },
    constructUpdatedObject() {
      if (this.updatedRestaurant.name === '') {
        this.updatedRestaurant.name = this.name
      }
      if (this.updatedRestaurant.tables === []) {
        this.updatedRestaurant.tables = this.tables
      }
      if (this.updatedRestaurant.location.city === '') {
        this.updatedRestaurant.location.city = this.city
      }
      if (this.updatedRestaurant.location.street === '') {
        this.updatedRestaurant.location.street = this.street
      }
      if (this.updatedRestaurant.location.number === null) {
        this.updatedRestaurant.location.number = this.number
      }
      this.updatedRestaurant.id = this.id
    }
  }
}
</script>
