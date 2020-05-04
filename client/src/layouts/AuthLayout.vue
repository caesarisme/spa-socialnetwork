<template>
  <div id="auth-layout">
    <router-view  />

    <h1>Social<br>Marswork</h1>
  </div>
</template>

<script>
  export default {
    name: "auth-layout"
  }
</script>

<style scoped lang="less">
  #auth-layout {
    width: 100vw;
    height: 100vh;
    background-image: url("~@/assets/auth-background.jpg");
    background-size: cover;
    background-position: left;

    padding: 0 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      text-align: right;
      font-size: 74px;
      color: #ffffff;
      font-weight: 400;
      text-shadow: 0 5px 30px #000000;
      text-transform: uppercase;
    }
  }
</style>