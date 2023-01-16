<template>
     <b-jumbotron header="Welcome" lead="Your one page to find a place to sit down on a busy night out">
    </b-jumbotron>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
.jumbotron {
    background-color:transparent !important;
}
</style>
