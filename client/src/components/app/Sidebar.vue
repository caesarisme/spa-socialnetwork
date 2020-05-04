<template>
  <div id="sidebar">
    <h1 class="logo">SOCIAL<br><span>MARS</span>WORK</h1>

    <div class="user-info">
      <div class="avatar" style="background-image: url('https://media.proprofs.com/images/QM/user_images/2169923/1517751718.jpg');"></div>
      <div class="info">
        <div class="name">Clark Kent</div>
        <div class="email">superman@mail.com</div>
      </div>
    </div>

    <nav>
      <div class="basic">
        <button class="active">
          <span class="icon"><i class="fas fa-rocket"></i></span>
          <span class="title">Home</span>
        </button>

        <button>
          <span class="icon"><i class="fas fa-globe-americas"></i></span>
          <span class="title">Friends</span>
        </button>

        <button>
          <span class="icon"><i class="fas fa-user-astronaut"></i></span>
          <span class="title">My profile</span>
        </button>
      </div>

      <button class="logout">
        <span class="icon"><i class="fas fa-space-shuttle"></i></span>
        <span class="title">Logout</span>
      </button>
    </nav>

  </div>
</template>

<script>
  export default {
    name: 'Sidebar'
  }
</script>

<style scoped lang="less">
  #sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 360px;
    background-image: url("~@/assets/sidebar-background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #ffffff;
    border-radius: 0 50px 50px 0;
    padding: 30px;
  }

  h1.logo {
    text-align: right;
    font-size: 24px;
    color: #ffffff;
  }

  .user-info {
    margin-top: 140px;
    margin-bottom: 100px;
    display: flex;
    color: #252745;

    .avatar {
      background-size: cover;
      width: 80px;
      height: 80px;
      border-radius: 30px;
    }

    .info {
      margin-left: 20px;

      .name {
        font-size: 24px;
        font-weight: 400;
      }

      .email {
        font-size: 16px;
        font-weight: 300;
      }
    }
  }

  button:active,
  button:focus {
    outline: none;
  }

  nav {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    button {
      display: block;
      width: 200px;
      height: 80px;
      border-radius: 30px;
      border: 2px solid #F1EEF6;
      text-align: left;
      margin-bottom: 20px;

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