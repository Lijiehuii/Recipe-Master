<template>
  <div class="top">
    <transition name="back">
      <div class="go-back" @click="goBack()">
        <van-icon size="16px" name="cross" />
      </div>
    </transition>
    <div class="time">
      <p class="left">
        <span>{{ day }}</span>
        <span>{{ month }}/{{ year }}</span>
      </p>
      <p class="right">{{ dat }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      day: 0,
      month: 0,
      year: 0,
      dat: 0,
    };
  },
  created() {
    this.getDate();
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDate() {
      this.date = new Date();
      console.log(this.date);
      this.day = this.date.getDay();
      this.month = this.date.getMonth() + 1;
      this.year = this.date.getFullYear();
      this.dat = this.date.getDate();
      switch (this.day) {
        case 0:
          this.day = "星期日";
          break;
        case 1:
          this.day = "星期一";
          break;
        case 2:
          this.day = "星期二";
          break;
        case 3:
          this.day = "星期三";
          break;
        case 4:
          this.day = "星期四";
          break;
        case 5:
          this.day = "星期五";
          break;
        case 6:
          this.day = "星期六";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.back-enter,
.back-leave-to {
  transform: rotateZ(0);
}
.back-enter-active,
.back-leave-active {
  transition: all 0.3s linear;
}
.back-enter-to,
.back-leave {
  transform: rotateZ(45deg);
}
.top {
  width: 100vw;
  height: 54px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .go-back {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .time {
    display: flex;
    .left {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      font-weight: 500;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 600;
    }
  }
}
</style>