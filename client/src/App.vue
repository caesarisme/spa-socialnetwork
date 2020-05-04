<template>
  <div id="app">
    <component is="MainLayout" />
  </div>
</template>

<script>
  import MainLayout from './layouts/MainLayout'

  export default {
    components: {
      MainLayout
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,500;0,700;1,400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: #F7F7FF;
  }
</style>
