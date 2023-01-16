<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table table-bordered">
          <thead>
            <tr>
            <th scope="col">Table Number</th>
            <th scope="col">Seats</th>
            <th scope="col">Available</th>
            <th v-show="isCustomer" scope="col">Book</th>
            <th v-show="!isCustomer" scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{{ number }}</td>
            <td>{{ seats }}</td>
            <td>{{ available }}</td>
            <td>
              <button v-show="!isCustomer" v-on:click="deleteTable" type="button" class="btn btn-danger">X</button>
              <button v-show="isCustomer" v-on:click="bookTable" type="button" class="btn btn-success">V</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number
    },
    seats: {
      type: Number
    },
    available: {
      type: Boolean
    },
    isCustomer: {
      type: Boolean
    }
  },
  methods: {
    deleteTable() {
      this.$emit('delete-this-table')
    },
    bookTable() {
      this.$emit('book-table')
    }
  }
}
</script>
