<template>
  <div class="wrapper">
    <form @submit.prevent="submitHandler" class="body">
      <div class="field">
        <label for="firstName">First name</label>
        <input v-model="firstName" type="text" id="firstName" placeholder="John">
        <p
                class="invalid"
                v-if="$v.firstName.$dirty && !$v.firstName.required"
        >First name is required</p>
      </div>

      <div class="field">
        <label for="lastName">Last name</label>
        <input v-model="lastName" type="text" id="lastName" placeholder="Doe">
        <p
                class="invalid"
                v-if="$v.lastName.$dirty && !$v.lastName.required"
        >Last name is required</p>
      </div>

      <div
              v-if="avatar"
              class="image"
              :style="{'background-image': `url(${avatar})`}"
      ></div>

      <div class="field">
        <label for="avatar">Avatar</label>
        <input ref="file" @change="uploadAvatar" type="file" id="avatar">
      </div>

      <div class="buttons">
        <button class="cancel" @click="$emit('close')">Cancel</button>
        <button class="submit" type="submit">Save</button>
      </div>
      
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: "NewPostModal",

    data: () => ({
      loading: false,
      result: null,
      searched: false,

      firstName: '',
      lastName: '',
      avatar: ''
    }),

    validations: {
      firstName: { required },
      lastName: { required }
    },

    computed: {
      ...mapGetters(['currentUser'])
    },

    methods: {
      ...mapActions(['search', 'getCurrentUserData', 'editUser']),
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        await this.editUser({
          firstName: this.firstName,
          lastName: this.lastName,
          avatar: this.avatar,
        })

        this.$emit('close')
      },

      async uploadAvatar() {
        const file = this.$refs.file.files[0]
        const formData = new FormData()
        formData.append('avatar', file)

        const { path } = await this.$http.avatarUpload({ formData })
        this.avatar = path
      }
    },

    async mounted () {
      await this.getCurrentUserData()

      this.firstName = this.currentUser.firstName
      this.lastName = this.currentUser.lastName
      this.avatar = this.currentUser.avatar
    }
  }
</script>

<style lang="less" scoped>
  p.invalid {
    font-size: 14px;
    margin-top: 5px;
    color: #FF6E69;
    font-weight: 400;
  }

  .no-result {
    margin-top: 30px;
    text-align: center;
  }

  .friend {
    margin-top: 30px;
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    border-radius: 30px;
    transition: 200ms linear;

    .avatar {
      margin-right: 10px;
      width: 80px;
      height: 80px;
      background-size: cover;
      background-position: center;
      border-radius: 20px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 5px;
    }

    .email {
      font-size: 16px;
      font-weight: 300;
    }

    &:hover {
      transform: scale(1.025);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }

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