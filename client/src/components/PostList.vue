<template>
  <div>

    <Post
      v-for="post in posts"
      :key="post._id"
      :post="post"
      :author="author"
    />

  </div>
</template>

<script>
  import Post from './Post'

  export default {
    name: "PostList",

    props: ['posts', 'author'],

    components: {
      Post
    }
  }
</script>

<style scoped>

</style>