<template>
  <body>
   <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Table</th>
      <th scope="col">Restaurant</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{ table }}</td>
      <td>{{ restaurant }}</td>
      <td><button type="button" class="btn btn-danger">X</button></td>
    </tr>
  </tbody>
</table>
  </body>
</template>

<script>
export default {
  props: {
    table: {
      type: Number
    },
    restaurant: {
      type: String
    },
    adress: {
      type: String
    }
  }
}
</script>
