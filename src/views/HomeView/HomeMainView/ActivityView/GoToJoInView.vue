<template>
  <div class="activity">
    <div class="activity-top">
      <van-icon name="arrow-left" style="font-size: 25px" @click="goback()" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
  created() {
    console.log(this.event);
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.activity {
  width: 100vw;
  height: 100vh;
  .activity-top {
    width: 100vw;
    height: 50px;
    padding: 0 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>