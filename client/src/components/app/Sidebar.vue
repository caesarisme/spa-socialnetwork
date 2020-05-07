<template>
  <div id="sidebar">
    <h1 class="logo">Stay<br>Home</h1>

    <Loader v-if="!currentUser" />

    <div v-else class="user-info">
      <div class="avatar" :style="{'background-image': `url('${ currentUser.avatar }')`}"></div>
      <div class="info">
        <div class="name">{{ `${currentUser.firstName} ${currentUser.lastName}` }}</div>
        <div class="email">{{ currentUser.email }}</div>
      </div>
    </div>

    <nav>
      <div class="basic">
        <router-link
          to="/"
          tag="button"
          active-class="active"
          exact
        >
          <span class="icon"><i class="fas fa-rocket"></i></span>
          <span class="title">Home</span>
        </router-link>

        <router-link
          to="/friends"
          tag="button"
          active-class="active"
        >
          <span class="icon"><i class="fas fa-globe-americas"></i></span>
          <span class="title">Friends</span>
        </router-link>

        <router-link
          to="/profile"
          tag="button"
          active-class="active"
        >
          <span class="icon"><i class="fas fa-user-astronaut"></i></span>
          <span class="title">My profile</span>
        </router-link>
      </div>

      <button class="logout" @click="logoutHandler">
        <span class="icon"><i class="fas fa-space-shuttle"></i></span>
        <span class="title">Logout</span>
      </button>
    </nav>

  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Sidebar',

    data: () => ({
      loading: true
    }),

    computed: {
      ...mapGetters(['currentUser'])
    },

    methods: {
      ...mapActions(['logout']),
      async logoutHandler() {
        await this.logout()

        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="less">
  #sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 360px;
    background-image: url("~@/assets/sidebar-background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #ffffff;
    border-radius: 0 50px 50px 0;
    padding: 30px;
  }

  h1.logo {
    text-align: right;
    font-size: 24px;
    color: #ffffff;
    text-transform: uppercase;
  }

  .user-info {
    margin-top: 140px;
    margin-bottom: 100px;
    display: flex;
    color: #252745;

    .avatar {
      background-size: cover;
      background-position: center;
      width: 80px;
      height: 80px;
      border-radius: 30px;
    }

    .info {
      margin-left: 20px;

      .name {
        font-size: 24px;
        font-weight: 400;
      }

      .email {
        font-size: 16px;
        font-weight: 300;
      }
    }
  }

  button:active,
  button:focus {
    outline: none;
  }

  nav {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    button {
      display: block;
      width: 200px;
      height: 80px;
      border-radius: 30px;
      border: 2px solid #F1EEF6;
      text-align: left;
      margin-bottom: 20px;
      transition: 200ms linear;

      span {
        display: inline-block;
        line-height: 76px;
        font-weight: 500;

        &.icon {
          width: 25%;
          text-align: right;
          font-size: 20px;
        }

        &.title {
          width: 75%;
          text-align: center;
          font-size: 16px;
          text-transform: uppercase;
        }
      }

      &.logout {
        background-color: #FF6E69;
        color: #ffffff;
        border: none;
        border-bottom: 5px solid #D35158;
      }

      &.active {
        border: 2px solid #FFF4EA;
        background-color: #FFF4EA;
        color: #7C4F55;
      }

      &.active:hover {
        background-color: #FFF4EA;
      }

      &:hover {
        background-color: #F1EEF6;
      }

      &.logout:hover {
        background-color: #FF6E69;
        border: none;
      }
    }
  }
</style>