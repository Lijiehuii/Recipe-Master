<template>
  <div class="note" @click="noteDetil(CardList.note.id)">
    <div class="note-top">
      <div class="user" @click.stop="goToUserInfo(CardList.note.author.id)">
        <img v-lazy="CardList.note.author.p" />
        <p class="user-text">
          <span class="user-name">{{ CardList.note.author.n }}</span
          ><span class="user-level"
            >LV.{{
              CardList.note.author.lvl ? CardList.note.author.lvl : "0"
            }}</span
          >
        </p>
      </div>
      <div class="feedback" @click.stop="show = true">
        <van-icon size="20px" name="ellipsis" />
      </div>
    </div>
    <div class="unlike" @click.stop="">
      <van-dialog
        style="z-index: 400"
        v-model="show"
        :title="`对此不感兴趣`"
        show-cancel-button
        @confirm="unlikeNote(CardList.note.id)"
      ></van-dialog>
    </div>
    <div class="note-pic">
      <img v-lazy="CardList.note.image_u" />
    </div>
    <div class="note-desc">
      <van-notice-bar
        wrapable
        :scrollable="false"
        :text="CardList.note.title"
      />
    </div>
    <div class="note-bottom">
      <div class="bottom-left" v-if="CardList.note.collect_users">
        <p class="like-users">
          <img
            v-for="c in CardList.note.collect_users"
            :key="c.id"
            v-lazy="c.p"
          />
        </p>
        <p class="like-count">{{ CardList.note.like_count }}人点赞</p>
      </div>
      <div class="bottom-right like" @click.stop="love(CardList.note.id)">
        <transition-group name="like">
          <div class="love" key="like - o">
            <van-icon
              size="20px"
              v-if="!CardList.love"
              name="like-o"
              color="#000"
            />
          </div>
          <div class="love" key="like">
            <van-icon
              size="20px"
              v-if="CardList.love"
              name="like"
              color="rgb(224, 72, 59)"
              key="like"
            />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: {
    CardList: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    noteDetil(id) {
      this.$router.push({
        path: "/home/note",
        query: {
          id,
        },
      });
    },
    unlikeNote(id) {
      console.log(id);
      this.$emit("fliter-unlike-note", id);
    },
    love(id) {
      console.log("点赞");
      console.log(this.CardList);
      console.log(id);
      if (this.CardList.love) {
        Toast("已取消点赞该笔笔记");
      } else if (!this.CardList.love) {
        Toast("已点赞该笔记");
      }
      this.$emit("set-love", id);
    },
    goToUserInfo(id) {
      let route = this.$route.name;
      this.$router.push({
        path: `${route}/userinfo`,
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.collection-enter {
  opacity: 0.5;
}

.collection-enter-active {
  transition: all 0.3s linear;
}

.collection-enter-to {
  opacity: 1;
}

.note {
  width: 100vw;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;

  .note-top {
    width: 100vw;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user {
      display: flex;
      align-items: center;

      img {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 999px;
        margin-right: 10px;
      }

      .user-name {
        margin-right: 10px;
        font-weight: 600;
        letter-spacing: 1.5px;
      }

      .user-level {
        font-size: 12px;
        font-style: italic;
        color: rgb(254, 198, 51);
      }
    }
  }

  .note-pic {
    width: 100vw;
    position: relative;
    font-size: 12px;
    color: #fff;

    img {
      display: block;
      width: 100%;
    }

    .note-name {
      width: 100vw;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 16px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      );
    }

    .follow {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 10px;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)
      );
    }
  }

  .note-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    .bottom-left {
      display: flex;
      align-items: center;

      .like-users {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;

        img {
          display: block;
          width: 20px;
          height: 20px;
          border: 2px solid #fff;
          background-color: #fff;
          border-radius: 999px;
          margin-left: -7px;

          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }

      .like-count {
        font-size: 12px;
      }
    }

    .bottom-right {
      position: relative;

      .love {
        position: absolute;
        top: -10px;
        right: 0px;
      }
    }
  }
}
</style>