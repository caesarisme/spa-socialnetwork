<template>
  <article>
    <div class="basic">
      <div class="image" :style="{ 'background-image': `url('${ post.image }')` }"></div>
      <div class="title">
        <h3>{{ post.title }}</h3>
      </div>
    </div>
    <div class="body">
      {{ post.content }}
    </div>
    <div class="additional-info">
      <div class="author">
        <div class="avatar" :style="{ 'background-image': `url('${ post.author.avatar }')` }"></div>
        <div class="name">{{ `${post.author.firstName} ${post.author.lastName}` }}</div>
      </div>

      <div class="date">{{ post.date | date('datetime') }}</div>
    </div>

    <div class="comments">

      <div
        v-for="comment in post.comments"
        :key="comment._id"
        class="comment"
      >
        <div class="comment-avatar" :style="{ 'background-image': `url('${ comment.author.avatar }')` }"></div>
        <div class="comment-body">
          <div class="name">{{ `${comment.author.firstName} ${comment.author.lastName}` }}</div>
          <div class="content">{{ comment.content }}</div>
          <div class="date">{{ comment.date | date('datetime') }}</div>
        </div>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>

      <div class="new-comment">
        <form>
          <input type="hidden" :value="post._id">
          <input type="text" placeholder="Your comment...">
          <button type="submit"><i class="fas fa-space-shuttle"></i></button>
        </form>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: "Post",

    props: ['post', 'author'],

    mounted () {
      if (typeof this.post.author === 'string'){
        this.post.author = this.author
      }
    }
  }
</script>

<style scoped lang="less">
  button:focus {
    outline: none;
  }

  article {
    width: 100%;
    background: #ffffff;
    border-radius: 30px;
    padding: 30px;
    margin-bottom: 60px;

    .basic {
      display: flex;
      padding-bottom: 30px;

      .image {
        width: 420px;
        max-width: 45%;
        height: 236px;
        background-position: center;
        background-size: cover;
        border-radius: 30px;
      }

      .title {
        flex: auto;
        padding-left: 30px;
        width: 45%;
        display: flex;
        align-items: center;
        padding-bottom: 40px;

        h3 {
          font-size: 28px;
          font-weight: 400;
        }
      }
    }

    .body {
      font-size: 18px;
      margin-bottom: 30px;
      color: #252745;
    }

    .additional-info {
      display: flex;
      margin-bottom: 30px;

      .author {
        display: flex;
        margin-right: 100px;
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
        }
        .name {
          margin-left: 20px;
          color: #9D9DAA;
          font-size: 16px;
          font-weight: 400;
          line-height: 60px;
        }
      }

      .date {
        color: #9D9DAA;
        font-size: 16px;
        font-weight: 400;
        line-height: 60px;
      }
    }

    .comments {
      border-top: 1px solid #9D9DAA;

      .comment {
        display: flex;
        margin-top: 30px;

        .comment-avatar {
          width: 80px;
          height: 80px;
          background-size: cover;
          background-position: center;
          border-radius: 30px;
        }

        .comment-body {
          padding-left: 30px;
          color: #252745;
          flex: auto;

          .name {
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 20px;
          }

          .content {
            font-size: 18px;
            font-weight: 300;
          }

          .date {
            margin-top: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #9D9DAA;
          }
        }

        button.delete {
          height: 30px;
          background: none;
          border: none;
          font-size: 20px;
          color: #FF6E69;
        }
      }

      .new-comment form {
        margin-top: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        background-color: #F1EEF6;
        border-radius: 20px;
        padding: 0 20px;

        input[type=text]:focus {
          outline: none;
        }

        input[type=text] {
          background: none;
          flex: auto;
          border: none;
          font-size: 18px;
          line-height: 40px;
          color: #252745;
          padding-right: 20px;
        }

        button {
          background: none;
          border: none;
          font-size: 25px;
          color: #252745;
        }
      }
    }
  }
</style>