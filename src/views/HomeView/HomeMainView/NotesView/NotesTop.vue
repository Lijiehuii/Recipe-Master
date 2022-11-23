<template>
  <div class="hot-topics" v-touch:swipe.stop="">
    <div class="topics-con" v-for="(ts, i) in hotTopic" :key="i">
      <p
        class="topic"
        v-for="t in ts"
        :key="t.content_count"
        :class="{ more: t.id == 0 }"
        @click="getTopicId(t.id)"
      >
        #{{ t.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotTopic: Array,
  },
  methods: {
    getTopicId(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-topics {
  width: 100%;
  overflow-x: auto;
  flex-direction: column;
  padding: 5px 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  .topics-con {
    width: 170vw;
    display: flex;
    justify-content: space-between;

    &:nth-child(1) {
      margin-bottom: 15px;
    }

    .topic {
      font-size: 12px;
      height: 30px;
      padding: 0 10px;
      margin-right: 5px;
      display: flex;
      justify-content: center;
      border-radius: 999px;
      align-items: center;
      color: rgb(86, 147, 147);
      background-color: rgb(244, 248, 251);

      &.more {
        border: 1px solid rgb(86, 147, 147);
      }
    }
  }
}
</style>