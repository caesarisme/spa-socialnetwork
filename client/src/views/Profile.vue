<template>
  <div id="profile">

    <Loader v-if="loading" />

    <section v-if="!loading" class="header">
      <h3 class="title">{{ `${user.firstName}'s Profile` }}</h3>
      <button>
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span class="title">{{ followBtnType }}</span>
      </button>
    </section>

    <ProfileInfo v-if="!loading" :user="user" style="margin-bottom: 60px;" />

    <PostList v-if="!loading" :posts="user.posts" :author="user" />

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ProfileInfo from '../components/ProfileInfo'
  import PostList from '../components/PostList'

  export default {
    name: "Profile",

    components: {
      PostList,
      ProfileInfo
    },

    data: () => ({
      loading: true,
      user: {}
    }),

    computed: {
      ...mapGetters(['currentUser']),
      followBtnType() {
        return this.currentUser.followings.includes(this.user._id)
          ? 'follow'
          : 'unfollow'
      }
    },

    methods: {
      ...mapActions(['getUserData'])
    },

    async mounted() {
      const { userId } = this.$route.params
      this.user = await this.getUserData(userId)
      this.loading = false
    }
  }
</script>

<style scoped lang="less">
  section.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h3.title {
      font-size: 28px;
      font-weight: 400;
    }

    button {
      display: block;
      width: 200px;
      height: 80px;
      border-radius: 30px;
      border: 2px solid #F1EEF6;
      background: none;
      text-align: left;

      span {
        display: inline-block;
        line-height: 80px;
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
        border: none;
        background-color: #FFF4EA;
        color: #7C4F55;
      }
    }
  }
</style>