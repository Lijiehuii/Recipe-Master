<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item
      v-for="(b, i) in banner"
      :key="i"
      @click="goToJoInActivity(b)"
    >
      <img :src="b.i" />
      <p class="banner-title">{{ b.t }}</p>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    banner: Array,
  },

  methods: {
    goToJoInActivity(b) {
      this.$router.push({
        path: "/home/activity",
        query: {
          url: b.url,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  width: 100vw;
  font-size: 20px;
  text-align: center;
  background-color: #fff;

  img {
    display: block;
    width: 100vw;
  }
  .banner-title {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    width: 100vw;
    text-align: center;
    line-height: 25px;
    color: #fc0;
    background-image: linear-gradient(180deg, #000, rgba(0, 0, 0, 0.1));
  }
}
</style>