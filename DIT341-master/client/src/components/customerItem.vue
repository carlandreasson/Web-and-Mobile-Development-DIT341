<template>
  <div>
    <b-card
      title="My profile"
      img-src=https://pbs.twimg.com/profile_images/1864605535/image_400x400.jpg
      img-alt="Image"
      img-top
      tag="article"
      style= "max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Name: {{name}}
        <br>
        Phone: {{phone}}
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
    phone: {
      type: String
    },
    customerId: {}
  }
}
</script>
