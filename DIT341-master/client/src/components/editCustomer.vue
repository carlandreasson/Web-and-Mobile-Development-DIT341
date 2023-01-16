<template>
  <div>
    <b-card
      title="Edit my profile"
      img-src=https://pbs.twimg.com/profile_images/1864605535/image_400x400.jpg
      img-alt="Image"
      img-top
      tag="article"
      style= "max-width: 20rem;"
      class="mb-2"
      align="center"
    >
      <b-card-text>
          <h6 class="form-label" for="customFile">Change picture</h6>
          <input type="file" class="form-control" id="profilepic" />
          <br>
          <b-form-input v-model="updatedCustomer.name" placeholder="Name"></b-form-input>
          <br>
          <b-form-input v-model="updatedCustomer.phone" placeholder="Phone"></b-form-input>
          <br>
          <b-button v-on:click="save" variant="success">Save</b-button>
      </b-card-text>

    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  props: {
    currentName: {
      type: String
    },
    currentPhone: {
      type: String
    }
  },
  data() {
    return {
      updatedCustomer: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    save() {
      if (this.updatedCustomer.name === '') {
        this.updatedCustomer.name = this.currentName
      }
      if (this.updatedCustomer.phone === '') {
        this.updatedCustomer.phone = this.currentPhone
      }
      console.log(this.updatedCustomer)
      Api.patch(`/customers/${this.$route.params.customerId}`, this.updatedCustomer)
        .then(response => {
          console.log('Customer updated with id ' + this.$route.params.customerId)
        })
        .catch(error => {
          console.log(error)
          alert('Customer not found')
        })
        .finally(() => {
          this.updatedCustomer.name = ''
          this.updatedCustomer.phone = null
          this.$emit('update-customer')
        })
    }
  }
}
</script>
