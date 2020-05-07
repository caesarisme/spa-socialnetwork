<template>
  <form @submit.prevent="submitHandler">
    <h3>Login</h3>
    <h6>Sign in to your account to continue</h6>

    <div class="fields">
      
      <div class="field">
        <label for="email">Email address</label>
        <input v-model="email" type="text" id="email" placeholder="name@example.com">
        <p
                v-if="$v.email.$dirty && !$v.email.email"
                class="invalid"
        >Enter correct email</p>
        <p
                class="invalid"
                v-if="$v.email.$dirty && !$v.email.required"
        >Email field is required</p>
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Password">
        <p
                class="invalid"
                v-if="$v.password.$dirty && !$v.password.required"
        >Password is required</p>
        <p
                class="invalid"
                v-if="$v.password.$dirty && !$v.password.minLength"
        >Password should contain {{ $v.password.$params.minLength.min }} characters</p>
      </div>
    </div>

    <button type="submit">Sign in &#8594;</button>

    <p class="warning">Not registered? <router-link to="/register">Create account</router-link></p>
  </form>
</template>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'

  export default {
    name: "Login",

    data: () => ({
      email: '', // Todo validation
      password: ''
    }),

    validations: {
      email: { email, required },
      password: { required, minLength: minLength(8) }
    },

    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

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

    p.warning {
      margin-top: 30px;
      font-weight: 300;
      font-size: 18px;
      color: #9D9DAA;

      a {
        color: #252745;
        text-decoration: none;
      }
    }

    p.invalid {
      font-size: 14px;
      margin-top: 5px;
      color: #FF6E69;
      font-weight: 400;
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