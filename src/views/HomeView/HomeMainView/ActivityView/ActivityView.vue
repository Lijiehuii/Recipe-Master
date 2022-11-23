<template>
  <div class="activity">
    <p class="title">热门活动上线中</p>
    <ActivityCard
      v-for="event in activityData"
      :key="event.id"
      :event="event"
    />
    <van-loading
      style="margin-top: 10px"
      size="24px"
      v-if="!activityData"
      vertical
      >数据加载中，请耐心等候...</van-loading
    >
  </div>
</template>

<script>
import ActivityCard from "@/components/ActivityCard.vue";
export default {
  components: {
    ActivityCard,
  },
  data() {
    return {
      activityData: "",
    };
  },
  created() {
    this.getActivityData();
  },
  methods: {
    getActivityData() {
      this.$axios
        .get(
          // "https://apis.netstart.cn/douguo/home/events/getlists?offset=0limit=20"
          "/activity.json"
        )
        .then(({ data }) => {
          this.activityData = data.data.ongoing.events;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.activity {
  position: absolute;
  top: 94px;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 100vw;
  padding: 5px 15px;
  height: calc(100vh - 154px);
  overflow: auto;

  .title {
    font-size: 16px;
    letter-spacing: 1.5px;
    line-height: 30px;
    font-weight: 600;
  }
}
</style>
