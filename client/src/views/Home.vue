<template>
  <div>

    <section class="header">
      <h3 class="title">My Feed</h3>
      <button>
        <span class="icon"><i class="fas fa-plus"></i></span>
        <span class="title">New post</span>
      </button>
    </section>

    <PostList :posts="posts" />

  </div>
</template>

<script>
  import PostList from '../components/PostList'

  export default {
    name: 'Home',

    components: {
      PostList
    },

    data: () => ({
      posts: [
        {
          _id: 'postId1',
          title: 'NASA selects three companies for human landing system awards',
          content: 'WASHINGTON — NASA announced April 30 it has selected three companies to begin work on designs for human lunar landers, one of which the agency still hopes will be ready to land humans on the moon by the end of 2024.\n\nNASA selected teams led by Blue Origin, Dynetics and SpaceX for 10-month study contracts for the Human Landing System (HLS) program. The combined value of the awards is $967 million.',
          image: 'https://static.vecteezy.com/system/resources/thumbnails/000/193/486/original/cosmos_2.jpg',
          author: {
            _id: 'authorId1',
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/94/27/8b/shutterstock-637884949.jpg'
          },
          date: new Date(),
          comments: []
        },
        {
          _id: 'postId2',
          title: 'Starship passes key pressurization test',
          content: 'WASHINGTON — A prototype of SpaceX’s Starship next-generation launch vehicle passed a pressurization test April 27, one that had destroyed three of its predecessors.\n\nThe Starship SN4 vehicle, on a pad at SpaceX’s facility in Boca Chica, Texas, was loaded with liquid nitrogen, a test designed to confirm its ability to hold cryogenic propellants at pressure. That test came a day after a pressurization test where the tanks were filled with gaseous nitrogen at ambient temperatures',
          image: 'https://cdn.dribbble.com/users/499399/screenshots/5240261/rocket_illustration.png',
          author: {
            _id: 'authorId2',
            firstName: 'Sofia',
            lastName: 'Clark',
            avatar: 'https://i.insider.com/5d70082b2e22af27a171f749?width=1100&format=jpeg&auto=webp'
          },
          date: new Date(),
          comments: [
            {
              _id: 'commentId',
              author: {
                _id: 'commenterId',
                firstName: 'John',
                lastName: 'Doe',
                avatar: 'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/94/27/8b/shutterstock-637884949.jpg'
              },
              content: 'Did you steal the post from spacenews.com?',
              date: new Date()
            }
          ]
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
</style>