<template>
  <div id="app">
    <main-navbar/>
      <my-header/>
    <!-- Render the content of the current page view -->
    <router-view/>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '@/components/myHeader.vue'
import MainNavbar from '@/components/mainNavbar.vue'
import MyFooter from '@/components/myFooter.vue'
export default { components: { MyHeader, MainNavbar, MyFooter } }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
