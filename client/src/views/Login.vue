<template>
  <form @submit.prevent="submitHandler">
    <h3>Login</h3>
    <h6>Sign in to your account to continue</h6>

    <div class="fields">
      
      <div class="field">
        <label for="email">Email address</label>
        <input v-model="email" type="text" id="email" placeholder="name@example.com">
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Password">
      </div>
      
    </div>

    <button type="submit">Sign in &#8594;</button>

    <p>Not registered? <a href="#">Create account</a></p>
  </form>
</template>

<script>

  export default {
    name: "Login",

    data: () => ({
      email: '', // Todo validation
      password: ''
    }),

    methods: {
      async submitHandler() {
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          })

          await this.$router.push('/')
        } catch (e) {}
      }
    }
  }
</script>

<style scoped lang="less">
  form {
    background-color: #F7F7FF;
    box-shadow: 0 5px 30px #000000;
    border-radius: 30px;
    padding: 60px;

    h3 {
      font-weight: 400;
      font-size: 28px;
      color: #252745;
      margin-bottom: 10px;
    }

    h6 {
      font-weight: 300;
      font-size: 18px;
      color: #252745;
      margin-bottom: 40px;
    }

    p {
      margin-top: 30px;
      font-weight: 300;
      font-size: 18px;
      color: #9D9DAA;

      a {
        color: #252745;
        text-decoration: none;
      }
    }

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
      width: 330px;
    }

    button:focus {
      outline: none;
    }

    button {
      line-height: 40px;
      font-size: 18px;
      color: #ffffff;
      background-color: #FFB12A;
      border-radius: 20px;
      border: none;
      padding: 0 20px;
    }
  }
</style>