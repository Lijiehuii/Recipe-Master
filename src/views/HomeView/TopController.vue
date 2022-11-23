<template>
  <div class="controller">
    <transition class="share">
      <div class="controller-left" @click="goToShare()">
        <van-icon name="plus" style="font-weight: bold" />
      </div>
    </transition>
    <div class="controller-search" @click="homeSearch">
      <van-search placeholder="请输入搜索关键词" disabled />
    </div>
    <div class="controller-right">
      <i class="icon icon-bell-o"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    homeSearch() {
      this.$router.push({ path: `/home/search` });
    },
    goToShare() {
      this.$router.push({ name: "share" });
    },
  },
};
</script>

<style lang="scss" scoped>
.share-enter,
.share-leave-to {
  transform: rotateZ(0);
}
.share-enter-active,
.share-leave-active {
  transition: all 0.3s linear;
}

.share-leave {
  transform: rotateZ(45deg);
}

.controller {
  width: 100vw;
  display: flex;
  height: 54px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .controller-left {
    flex: 0 0 30px;
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: rgb(252, 201, 48);
    border-radius: 999px;
  }
  .controller-search {
    width: calc(100% - 50px);
  }

  .controller-right {
    .icon {
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>