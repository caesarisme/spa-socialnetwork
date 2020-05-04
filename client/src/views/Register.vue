<template>
  <form>
    <h3>Registration</h3>
    <h6>Create an account and join us</h6>

    <div class="fields">

      <div class="field">
        <label for="email">Email address</label>
        <input type="text" id="email" placeholder="name@example.com">
      </div>

      <div class="empty"></div>

      <div class="field">
        <label for="firstName">First name</label>
        <input type="text" id="firstName" placeholder="John">
      </div>

      <div class="field">
        <label for="lastName">Last name</label>
        <input type="text" id="lastName" placeholder="Doe">
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password">
      </div>

      <div class="field">
        <label for="password2">Confirm password</label>
        <input type="password" id="password2" placeholder="Password">
      </div>

    </div>

    <button type="submit">Sign up &#8594;</button>

    <p>Already registered? <a href="#">Sign in</a></p>
  </form>
</template>

<script>
  export default {
    name: "Register"
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