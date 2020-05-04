<template>
  <div id="chat">

    <div class="chat-part">
      <h3 class="title">Solar System Chat</h3>

      <div ref="messagesBlock" class="messages">

        <div class="incoming message">
          <div class="content">
            <div class="header">
              <span class="name">John Doe</span>
              <span class="time">15:41</span>
            </div>
            <div class="body">
              What is Lorem Ipsum?
            </div>
          </div>
        </div>

        <div class="incoming message">
          <div class="content">
            <div class="header">
              <span class="name">John Doe</span>
              <span class="time">15:41</span>
            </div>
            <div class="body">
              What is Lorem Ipsum?
            </div>
          </div>
        </div>

        <div class="incoming message">
          <div class="content">
            <div class="header">
              <span class="name">John Doe</span>
              <span class="time">15:41</span>
            </div>
            <div class="body">
              What is Lorem Ipsum?
            </div>
          </div>
        </div>

        <div class="incoming message">
          <div class="content">
            <div class="header">
              <span class="name">John Doe</span>
              <span class="time">15:41</span>
            </div>
            <div class="body">
              What is Lorem Ipsum?
            </div>
          </div>
        </div>

        <div class="last incoming message">
          <div class="avatar">
            <div class="image" style="background-image: url('https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/94/27/8b/shutterstock-637884949.jpg')"></div>
          </div>
          <div class="content">
            <div class="header">
              <span class="name">John Doe</span>
              <span class="time">15:41</span>
            </div>
            <div class="body">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </div>
          </div>
        </div>

        <div class="sent message">
          <div class="content">
            <div class="body">
              What is Lorem Ipsum?
            </div>
            <span class="time">15:43</span>
          </div>
        </div>

        <div class="last sent message">
          <div class="content">
            <div class="body">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </div>
            <span class="time">15:43</span>
          </div>
        </div>

        <div class="incoming message">
          <div class="content">
            <div class="header">
              <span class="name">Sofia Clark</span>
              <span class="time">16:20</span>
            </div>
            <div class="body">
              What is Lorem Ipsum?
            </div>
          </div>
        </div>

        <div class="last incoming message">
          <div class="avatar">
            <div class="image" style="background-image: url('https://i.insider.com/5d70082b2e22af27a171f749?width=1100&format=jpeg&auto=webp')"></div>
          </div>
          <div class="content">
            <div class="header">
              <span class="name">Sofia Clark</span>
              <span class="time">16:21</span>
            </div>
            <div class="body">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </div>
          </div>
        </div>

        <div class="last sent message">
          <div class="content">
            <div class="body">
              OK :)
            </div>
            <span class="time">16:40</span>
          </div>
        </div>

      </div>
    </div>

    <div class="type-part">
      <form>
        <input type="text" placeholder="Type something...">
        <button type="submit"><i class="fas fa-space-shuttle"></i></button>
      </form>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Chat",

    mounted() {
      this.$refs.messagesBlock.scrollTop = this.$refs.messagesBlock.scrollHeight
    }
  }
</script>

<style scoped lang="less">
  #chat {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 480px;
    height: 100vh;
    background-color: #252745;
    border-radius: 50px 0 0 50px;

    .chat-part {
      flex: auto;
      border-radius: 50px 0 0 50px;
      padding: 60px 60px 30px 60px;
      background-color: #FFF2E5;
      display: flex;
      flex-direction: column;
      align-items: center;

      h3.title {
        font-size: 28px;
        font-weight: 400;
        margin-bottom: 60px;
        width: 100%;
        text-align: left;
      }

      .messages {
        flex: auto;
        height: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        .message {
          display: flex;
          margin-bottom: 5px;

          .body {
            color: #ffffff;
            font-size: 16px;
          }

          .avatar {
            display: flex;
            align-items: flex-end;
            .image {
              background-size: cover;
              background-position: center;
              width: 50px;
              height: 50px;
              border-radius: 20px;
              background-color: #c2c2c2;
            }
          }
        }

        .incoming {
          .content {
            padding: 10px;
            width: 240px;
            background-color: #252745;
            font-weight: 300;
            border-radius: 10px;
            margin-left: 60px;

            .header {
              color: #C2C2C2;
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              font-size: 14px;
            }
          }

          &.last {
            .content {
              border-radius: 10px 10px 10px 0;
              margin-left: 10px;
            }
          }
        }

        .sent {
          justify-content: flex-end;
          .content {
            padding: 10px;
            width: 280px;
            background-color: #474965;
            font-weight: 300;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;

            .time {
              color: #C2C2C2;
              font-size: 14px;
            }
          }

          &.last {
            .content {
              border-radius: 10px 10px 0 10px;
            }
          }
        }
      }
    }

    .type-part {
      border-radius: 0 0 0 50px;
      padding: 0 30px;

      form {
        height: 100px;
        display: flex;
        align-items: center;
      }

      input {
        flex: auto;
        margin-right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        color: #ffffff;

        &:focus {
          outline: none
        }
      }

      button {
        background: none;
        border: none;
        font-size: 25px;
        color: #ffffff;
      }
    }
  }
</style>