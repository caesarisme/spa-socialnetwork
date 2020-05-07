<template>
  <div>

    <section class="header">
      <h3 class="title">My Feed</h3>
      <button @click="() => this.newPostModalShow = true">
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span class="title">New post</span>
      </button>
    </section>

    <Loader v-if="loading" />

    <PostList v-else :posts="feed" />

    <NewPostModal v-if="newPostModalShow" @close="() => { this.newPostModalShow = false }" />

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import PostList from '../components/PostList'
  import NewPostModal from '../components/modals/NewPostModal'

  export default {
    name: 'Home',

    components: {
      NewPostModal,
      PostList
    },

    data: () => ({
      loading: true,
      newPostModalShow: false
    }),

    computed: {
      ...mapGetters(['feed'])
    },

    methods: {
      ...mapActions(['getFeed'])
    },

    async mounted() {
      await this.getFeed()
      this.loading = false
    }
  }
</script>

<style scoped lang="less">
  button:active,
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