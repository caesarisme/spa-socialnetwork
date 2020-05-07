<template>
  <form @submit.prevent="submitHandler">
    <h3>Registration</h3>
    <h6>Create an account and join us</h6>

    <div class="fields">

      <div class="field">
        <label for="email">Email address</label>
        <input v-model="email" type="text" id="email" placeholder="name@example.com">
        <p
                class="invalid"
                v-if="$v.email.$dirty && !$v.email.email"
        >Enter correct email</p>
        <p
                class="invalid"
                v-if="$v.email.$dirty && !$v.email.required"
        >Email field is required</p>
      </div>

      <div class="empty"></div>

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

      <div class="field">
        <label for="password">Password</label>
        <input v-model="password1" type="password" id="password" placeholder="Password">
        <p
                class="invalid"
                v-if="$v.password1.$dirty && !$v.password1.required"
        >Password is required</p>
        <p
                class="invalid"
                v-if="$v.password1.$dirty && !$v.password1.minLength"
        >Password should contain {{ $v.password1.$params.minLength.min }} characters</p>
      </div>

      <div class="field">
        <label for="password2">Confirm password</label>
        <input v-model="password2" type="password" id="password2" placeholder="Password">
        <p
                class="invalid"
                v-if="$v.password2.$dirty && !$v.password2.isMatch"
        >Passwords should match</p>
      </div>

    </div>

    <button type="submit">Sign up &#8594;</button>

    <p class="warning">Already registered? <router-link to="/login">Sign in</router-link></p>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    name: "Register",

    data: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password1: '',
      password2: ''
    }),

    validations: {
      email: { email, required },
      firstName: { required },
      lastName: { required },
      password1: { minLength: minLength(8), required },
      password2: { isMatch: sameAs('password1') }
    },

    methods: {
      ...mapActions(['register']),
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        const formData = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password1
        }

        await this.register(formData)
        this.$router.push('/login')
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
    width: 810px;
    background-image: url("~@/assets/register-background.png");
    background-repeat: no-repeat;
    background-position: bottom right;

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

    .fields {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .field {
      margin-bottom: 30px;
    }

    .empty {
      width: 330px;
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