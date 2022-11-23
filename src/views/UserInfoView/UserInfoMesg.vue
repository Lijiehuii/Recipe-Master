<template>
  <div class="user-msg">
    <div v-if="userInfoData">
      <MsgTop />
      <MsgMiddleView />
      <MsgBottomView />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MsgTop from "./MsgTop.vue";
import MsgMiddleView from "./MsgMiddle/MsgMiddleView.vue";
import MsgBottomView from "./MsgBottom/MsgBottomView.vue";
export default {
  components: { MsgTop, MsgMiddleView, MsgBottomView },
  computed: {
    ...mapState(["userInfoData"]),
  },
};
</script>

<style lang="scss" scoped>
</style>