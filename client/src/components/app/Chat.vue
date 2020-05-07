<template>
  <div id="chat">

    <div class="chat-part">
      <h3 class="title">Solar System Chat</h3>

      <div ref="messagesBlock" class="messages">

        <div
                v-for="(msg, idx) in messages"
                :key="idx"
                class="message"
                :class="{
                  'incoming': msg.type === 'incoming',
                  'sent': msg.type === 'sent',
                  'last': isLast(idx)
                }"
        >
          <div v-if="isLast(idx) && msg.type === 'incoming'" class="avatar">
            <div
                    class="image"
                    :style="{ 'background-image': `url(${ msg.avatar })` }"
            ></div>
          </div>
          <div class="content">
            <div v-if="msg.type === 'incoming'" class="header">
              <span class="name">{{ msg.name }}</span>
              <span class="time">{{ msg.time | date('time') }}</span>
            </div>
            <div class="body">{{ msg.content }}</div>
            <span v-if="msg.type === 'sent'" class="time">{{ msg.time | date('time') }}</span>
          </div>
        </div>

      </div>
    </div>

    <div class="type-part">
      <form @submit.prevent="sendMessage">
        <input v-model="message" type="text" placeholder="Type something...">
        <button type="submit"><i class="fas fa-space-shuttle"></i></button>
      </form>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import io from 'socket.io-client'

  export default {
    name: "Chat",

    data: () => ({
      socket: null,
      message: '',
      messages: []
    }),

    computed: {
      ...mapGetters(['currentUser'])
    },

    methods: {
      ...mapActions(['getCurrentUserData']),
      isLast(idx) {
        if (idx >= this.messages.length - 1) {
          return true
        } else {
          return this.messages[idx].name !== this.messages[idx+1].name
        }
      },
      connect() {
        this.socket = io('http://localhost:3000/')

        this.socket.on('sendMessage', message => {
          this.messages = this.messages.concat({
            ...message,
            type: message.userId === this.currentUser._id
              ? 'sent'
              : 'incoming'
          })
          setTimeout(() => {
            this.$refs.messagesBlock.scrollTop = this.$refs.messagesBlock.scrollHeight
          }, 0)
        })
      },
      setUser() {
        this.socket.emit('setUser', {
          _id: this.currentUser._id,
          name: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
          avatar: `${this.currentUser.avatar}`
        })
      },
      sendMessage() {
        if (!this.message.trim()) {
          return
        }
        this.socket.emit('newMessage', this.message)
        this.message = ''
      }
    },

    async mounted() {
      await this.getCurrentUserData()
      this.$refs.messagesBlock.scrollTop = this.$refs.messagesBlock.scrollHeight
      this.connect()
      this.setUser()
    }
  }
</script>

<style scoped lang="less">
  button:focus {
    outline: none;
  }

  #chat {
    position: fixed;
    z-index: 1;
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