<template>
  <div id="profile">

    <Loader v-if="loading" />

    <section v-if="!loading" class="header">
      <h3 class="title">{{ `${user.firstName}'s Profile` }}</h3>
      <button @click="() => this.showEditProfileModal = true" v-if="isMyProfile">
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span class="title">Edit profile</span>
      </button>
      <button v-else-if="followBtnType === 'follow'" @click="followHandler" v-else>
        <span class="icon"><i class="fas fa-user-plus"></i></span>
        <span class="title">{{ followBtnType }}</span>
      </button>
      <button v-else-if="followBtnType === 'unfollow'" @click="unfollowHandler" v-else>
        <span class="icon"><i class="fas fa-user-minus"></i></span>
        <span class="title">{{ followBtnType }}</span>
      </button>
    </section>

    <ProfileInfo v-if="!loading" :user="user" style="margin-bottom: 60px;" />

    <PostList v-if="!loading" :posts="user.posts" :author="user" @updatePost="update" />

    <EditProfileModal v-if="showEditProfileModal" @close="() => this.showEditProfileModal = false" />


  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ProfileInfo from '../components/ProfileInfo'
  import PostList from '../components/PostList'
  import EditProfileModal from '../components/modals/EditProfileModal'

  export default {
    name: "Profile",

    components: {
      PostList,
      ProfileInfo,
      EditProfileModal
    },

    data: () => ({
      loading: true,
      user: {},
      isMyProfile: false,
      showEditProfileModal: false
    }),

    computed: {
      ...mapGetters(['currentUser']),
      followBtnType() {
        return this.currentUser.followings.includes(this.user._id)
          ? 'unfollow'
          : 'follow'
      }
    },

    methods: {
      ...mapActions([ 'getUserData', 'getCurrentUserData', 'followById', 'unfollowById']),
      async followHandler () {
        await this.followById(this.user._id)
        this.user = await this.getUserData(this.user._id) // Todo: check profile info update
      },
      async unfollowHandler () {
        await this.unfollowById(this.user._id)
        this.user = await this.getUserData(this.user._id) // Todo: check profile info update
      },
      async update() {
        await this.getCurrentUserData()
        const userId = this.$route.params.userId || this.currentUser._id
        this.user = await this.getUserData(userId)
        console.log(this.user)
      }
    },


    async mounted() {
      const { userId } = this.$route.params
      await this.getCurrentUserData()
      this.user = await this.getUserData(this.currentUser._id)
      this.isMyProfile = userId === this.currentUser._id || !userId
      if (this.isMyProfile && !!userId) {
        this.$router.push('/profile')
      } else if (!!userId) {
        this.user = await this.getUserData(userId)
      }
      this.loading = false
    }
  }
</script>

<style scoped lang="less">
  button:focus {
    outline: none;
  }

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
        border: none;
        background-color: #FFF4EA;
        color: #7C4F55;
      }
    }
  }
</style>