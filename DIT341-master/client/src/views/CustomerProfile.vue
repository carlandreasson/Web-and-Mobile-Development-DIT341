<template>
  <body>
    <br>
    <b-container class="Customer Profile">
      <h2> Customer Profile </h2>
      <br>
        <b-row>
          <b-col>
            <customer-item :name="this.currentCustomer.name" :phone="this.currentCustomer.phone" :customerId="this.currentCustomer._id"></customer-item>
            </b-col>
        <b-col>
        <edit-customer @update-customer="getCustomerInfo" :currentName="currentCustomer.name" :currentPhone="currentCustomer.phone"/>
        </b-col>
        <b-col><customer-menu/></b-col>
        <b-col></b-col>
        </b-row>
      </b-container>
      <br><br>
  </body>
</template>

<script>
import { Api } from '@/Api'
import CustomerItem from '@/components/customerItem.vue'
import CustomerMenu from '@/components/customerMenu.vue'
import EditCustomer from '@/components/editCustomer.vue'

export default {
  components: {
    CustomerMenu,
    CustomerItem,
    EditCustomer
  },
  mounted() {
    console.log('Retrieving customer in DB')
    // this.id = this.$route.params.customerId // save the id attribute as the id in the url using the route.
    Api.get(`/customers/${this.$route.params.customerId}`) // gives the id previsouly retrieved from the url to the get function as a parameter
      .then(response => {
        this.currentCustomer = response.data
        console.log('Customer found with id ' + this.$route.params.customerId)
      })
      .catch(error => {
        console.log(error)
        alert('Customer not found')
      })
  },
  data() {
    return {
      currentCustomer: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    getCustomerInfo() {
      Api.get(`/customers/${this.$route.params.customerId}`) // gives the id previsouly retrieved from the url to the get function as a parameter
        .then(response => {
          this.currentCustomer = response.data
          console.log('Customer found with id ' + this.$route.params.customerId)
        })
        .catch(error => {
          console.log(error)
          alert('Customer not found')
        })
    }
  }
}

</script>

<style>
.button {
    box-shadow: 0 6px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    transition-duration: 0.4s;
    background-color: #52a55c;
    border-radius: 8px;
    width: 50%;
    display: inline-block;
    vertical-align: top;
}

.button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    background-color: #52a55c;
    color: white;
}

</style>
