<template>
  <transition name="share">
    <div class="share">
      <ShareTop />
      <ShareMain />
    </div>
  </transition>
</template>

<script>
import ShareTop from "./ShareTop.vue";
import ShareMain from "./ShareMain.vue";
export default {
  components: {
    ShareTop,
    ShareMain,
  },
};
</script>

<style lang="scss" scoped>
.share-enter,
.share-leave-to {
  width: 0;
  height: 0;
}
.share-enter-active,
.share-leave-active {
  transition: all 0.3s linear;
}
.share-enter-to,
.share-leave {
  width: 100vw;
  height: 100vh;
}

.share {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
}
</style>