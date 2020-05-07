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
  import { mapActions } from 'vuex'

  export default {
    name: 'main-layout',

    components: {
      Sidebar,
      Chat
    },

    data: () => ({
      loading: true
    }),

    methods: {
      ...mapActions(['getCurrentUserData'])
    },

    async mounted () {
      await this.getCurrentUserData()
      this.loading = false
    }
  }
</script>

<style scoped lang="less">
  #main-layout {
    padding: 60px 540px 60px 420px;
  }
</style>