<template>
  <div>
    <div tag="div" to="/hoem/activity" class="event" @click="goToJoInActivity">
      <div class="img-con">
        <van-image width="92.8vw" height="100%" lazy-load :src="event.image">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="bottom">
        <p class="event-title">{{ event.name }}</p>
        <p class="event-join">
          立即参加
          <van-icon name="arrow" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
  methods: {
    goToJoInActivity() {
      console.log(this.event.url);
      this.$router.push({
        path: "/home/activity",
        query: {
          url: `${this.event.url}`,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.event {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .img-con {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }

    &::after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0);
      content: "";
    }
  }

  .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    font-size: 14px;
    padding: 5px 0;
    color: #000;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;

    .event-title {
      flex: 7;
      padding-right: 50px;
    }

    .event-join {
      // flex: 3;
      color: rgb(90, 141, 151);
    }
  }
}
</style>