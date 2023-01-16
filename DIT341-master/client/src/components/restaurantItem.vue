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
        Adress: {{street}} {{number}}, {{city}}
        <br>
        Seats: {{ seats }}
        <br>
        <br>
        <b-button v-show="this.isCustomer" v-on:click="goTo" variant="success">Choose</b-button>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
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
    isCustomer: {
      type: Boolean
    }
  },
  methods: {
    goTo() {
      this.$emit('go-to')
    }
  }
}
</script>

<style>

</style>
