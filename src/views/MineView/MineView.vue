<template>
  <transition name="mine">
    <div class="mine">
      <MineTop />
      <MineMain />
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import MineTop from "./MineTop.vue";
import MineMain from "./MineMain.vue";
export default {
  components: { MineTop, MineMain },
};
</script>

<style lang="scss" scoped>
.mine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  padding-bottom: 50px;
}
</style>
