<template>
  <div class="wrapper">
    <form @submit.prevent="submitHandler" class="body">
      <div class="field">
        <label for="title">Post title</label>
        <input v-model="title" type="text" id="title" placeholder="Title">
      </div>

      <div
              v-if="image"
              class="image"
              :style="{'background-image': `url(${image})`}"
      ></div>

      <div class="field">
        <label for="image">Image</label>
        <input type="file" ref="file" @change="imageUpload" id="image" placeholder="Title">
      </div>

      <div class="field">
        <label for="content">Content</label>
        <input v-model="content" type="text" id="content" placeholder="Any content">
      </div>

      <div class="buttons">
        <button @click.prevent="$emit('close')" class="cancel">Cancel</button>
        <button type="submit" class="submit">Submit</button>
      </div>
      
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "NewPostModal",

    data: () => ({
      image: '',
      title: '',
      content: '',
    }),

    methods: {
      ...mapActions(['postNewPost']),
      async imageUpload() {
        const file = this.$refs.file.files[0]
        const formData = new FormData()
        formData.append('image', file)

        const { path } = await this.$http.imageUpload({ formData })
        this.image = path
      },
      async submitHandler() {
        await this.postNewPost({
          title: this.title,
          image: this.image,
          content: this.content
        })
        this.title = ''
        this.image = ''
        this.content = ''

        this.$emit('close')
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    display: flex;
    justify-content: center;
    align-items: center;

    .body {
      width: 600px;
      padding: 30px;
      background-color: #F7F7FF;
      border-radius: 30px;
    }

    form {
      .field {
        margin-bottom: 30px;
      }

      input:focus {
        outline: none;
      }

      label {
        font-weight: 400;
        font-size: 14px;
        color: #9D9DAA;
        display: block;
      }

      input {
        margin-top: 5px;
        background-color: #F1EEF6;
        border-radius: 20px;
        border: none;
        line-height: 40px;
        color: #252745;
        font-size: 18px;
        padding: 0 20px;
        font-weight: 300;
        width: 100%;
      }

      .image {
        height: 300px;
        border-radius: 30px;
        margin-bottom: 30px;
        background-size: cover;
        background-position: center;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }

  button:focus {
    outline: none;
  }

  .cancel {
    background-color: #FF6E69;
    padding: 0 40px;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 48px;
    border-radius: 20px;
    border: none;
    margin-right: 20px;
  }

  .submit {
    background-color: #FFB12A;
    padding: 0 40px;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 48px;
    border-radius: 20px;
    border: none;
  }
</style>