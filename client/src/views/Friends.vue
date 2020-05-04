<template>
  <div id="friends">

    <section class="header">
      <h3 class="title">My Shuttle</h3>
      <button>
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span class="title">Add Friend</span>
      </button>
    </section>

    <div class="friend-list">
      <div
              v-for="friend in friends"
              :key="friend._id"
              class="friend"
      >
        <div class="avatar" :style="{ 'background-image': `url('${friend.avatar}')` }"></div>
        <div class="info">
          <div class="name">{{ `${friend.firstName} ${friend.lastName}` }}</div>
          <div class="email">{{ friend.email }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Friends",

    data: () => ({
      friends: [
        {
          _id: '1',
          firstName: 'Sofia',
          lastName: 'Clark',
          email: 'sofialclark@mail.com',
          avatar: 'https://i.insider.com/5d70082b2e22af27a171f749?width=1100&format=jpeg&auto=webp'
        }, {
          _id: '2',
          firstName: 'John',
          lastName: 'Doe',
          email: 'famousname@mail.com',
          avatar: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/94/27/8b/shutterstock-637884949.jpg'
        }, {
          _id: '3',
          firstName: 'Barack',
          lastName: 'Obama',
          email: 'usanambaone@mail.com',
          avatar: 'https://nationalpostcom.files.wordpress.com/2019/11/barack-obama-1-1.png'
        },
      ]
    })
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

  .friend-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .friend {
      width: 48%;
      background-color: #ffffff;
      margin-bottom: 30px;
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
  }
</style>