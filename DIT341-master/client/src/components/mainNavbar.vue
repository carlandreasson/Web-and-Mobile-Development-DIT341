<template>
  <b-navbar name="main-navbar" type= "light" variant="light" id="nav">
      <b-navbar-nav>
          <b-nav-item-dropdown href="/" text=Home>
          <b-dropdown-item href="/">Home</b-dropdown-item>
          <b-dropdown-item href="/SignIn">Log In</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown href="/" text=Restaurant right>
          <b-dropdown-item href="/RestaurantRegistration">Register</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown href="/" text=Customer right>
          <b-dropdown-item href="/CustomerRegistration">Register</b-dropdown-item>
          </b-nav-item-dropdown>

      </b-navbar-nav>
     </b-navbar>
</template>
