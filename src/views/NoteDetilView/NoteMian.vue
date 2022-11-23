<template>
  <div class="note" v-if="noteData">
    <img v-if="noteData?.images" :src="noteData?.images[0]?.u" />
    <div class="note-main">
      <p class="title">
        {{ noteData.title }}
      </p>
      <div class="note-content">
        <p v-for="(c, i) in noteData.contents" :key="i">{{ c.c }}</p>
      </div>
      <div class="bottom">
        <p class="create-time">
          {{ createTime }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    noteData: [Object, String],
  },
  computed: {
    createTime() {
      return this.noteData?.publishtime?.split(" ")[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  padding-top: 50px;
  img {
    display: block;
    width: 100vw;
  }
  .note-main {
    padding: 10px 20px;

    .title {
      margin: 10px 0;
      font-size: 14px;
      font-weight: 600;
    }

    .note-content {
      font-size: 13px;
      line-height: 20px;
    }

    .bottom {
      font-size: 13px;
      color: #888;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .count {
        .favo-count {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

