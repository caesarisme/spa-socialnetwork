<template>
  <div id="profile">
    <i class="far fa-edit"></i>

    <ProfileInfo user="user" />

  </div>
</template>

<script>
  import ProfileInfo from '../components/ProfileInfo'

  export default {
    name: "Profile",

    components: {
      ProfileInfo
    }
  }
</script>

<style scoped>

</style>