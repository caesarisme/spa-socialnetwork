<template>
  <div id="main-layout">
    <Sidebar />

    <router-view />

    <Chat />
  </div>
</template>

<script>
  import Sidebar from '../components/app/Sidebar'
  import Chat from '../components/app/Chat'

  export default {
    name: 'MainLayout',

    components: {
      Sidebar,
      Chat
    }
  }
</script>

<style scoped lang="less">
  #main-layout {
    padding: 60px 540px 60px 420px;
  }
</style>