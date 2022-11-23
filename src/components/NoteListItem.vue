<template>
  <div class="note">
    <div class="note-list" @click="noteDetil(note.note.id)">
      <img :src="note.note?.image_u" />
      <p class="title">
        <van-notice-bar
          background="#fff"
          :scrollable="false"
          :text="note.note?.title"
        />
      </p>
      <div class="note-bottom">
        <div class="user">
          <img :src="note.note?.author.p" />
          <p class="user-name">{{ note.note?.author.n }}</p>
        </div>
        <div class="love" @click.stop="love(note.note.id)">
          <transition-group name="like">
            <div class="like" key="like - o">
              <van-icon
                size="20px"
                v-if="!note.love"
                name="like-o"
                color="#000"
              />
            </div>
            <div class="like" key="like">
              <van-icon
                size="20px"
                v-if="note.love"
                name="like"
                color="rgb(224, 72, 59)"
              />
            </div>
          </transition-group>
          <span class="count">{{ note.note?.like_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    note: Object,
  },
  created() {
    // console.log("note=>", this.note);
  },

  methods: {
    getNoteMsg(id) {
      console.log(id);
      this.$emit("set-love-statu", id);
    },
    noteDetil(id) {
      this.$router.push({
        path: "/home/note",
        query: {
          id,
        },
      });
    },
    love(id) {
      this.$emit("set-love-note",id)
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  width: 44vw;
  height: 100%;
  padding: 1px;
  margin-bottom: 5px;
  -webkit-column-break-inside: avoid;

  .note-list {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .note-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px 5px;

      .user {
        display: flex;
        align-items: center;
        font-size: 12px;

        img {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 3px;
          border-radius: 999px;
        }

        .user-name {
          max-width: 20vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .love {
        display: flex;
        align-items: center;
        position: relative;
        .like {
          position: absolute;
          top: -2px;
          right: 27px;
        }
      }
    }
  }
}
</style>