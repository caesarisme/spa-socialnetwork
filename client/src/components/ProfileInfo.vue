<template>
  <div id="profile-info">
    <div class="avatar" :style="{'background-image': `url('${ user.avatar }')`}"></div>
    <div class="info">
      <div class="basic">
        <h4 class="name">{{ `${user.firstName} ${user.lastName}` }}</h4> <!-- Todo: add 'edit' button -->
        <h5 class="email">{{ user.email }}</h5>
      </div>
      <div class="additional">
        <div>
          <span>Posts</span>
          <h5>{{ user.posts.length }}</h5>
        </div>

        <div>
          <span>Followers</span>
          <h5>{{ user.followers.length }}</h5>
        </div>

        <div>
          <span>Followings</span>
          <h5>{{ user.followings.length }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileInfo",

    props: ['user']
  }
</script>

<style scoped lang="less">
  #profile-info {
    width: 100%;
    background-color: #ffffff;
    border-radius: 30px;
    padding: 30px;
    display: flex;

    .avatar {
      height: 200px;
      width: 200px;
      border-radius: 30px;
      background-position: center;
      background-size: cover;
    }

    .info {
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .basic {
      .name {
        font-size: 24px;
        margin-bottom: 10px;
        font-weight: 400;
        color: #252745;
      }
      .email {
        font-size: 18px;
        font-weight: 300;
        color: #252745;
      }
    }

    .additional {
      display: flex;

      div {
        width: 100px;
        margin-right: 30px;

        span {
          font-size: 16px;
          color: #9D9DAA;
          font-weight: 300;
        }

        h5 {
          font-size: 32px;
          font-weight: 400;
          color: #252745;
        }
      }
    }
  }
</style>