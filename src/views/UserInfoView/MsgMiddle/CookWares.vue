<template>
  <div class="cook-wares" v-if="userInfoData?.cookwares.length != 0">
    <div class="wares-title">厨房用具</div>
    <div class="wares">
      <p class="wares-text">
        <span
          v-for="(c, i) in userInfoData?.cookwares"
          :key="c.cookware_category_id"
          >{{ c.brand_name + c.cookware_category_name }}
          <i v-if="i < userInfoData?.cookwares.length - 1">、</i></span
        >
      </p>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfoData"]),
  },
};
</script>

<style lang="scss" scoped>
.cook-wares {
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 14px;

  .wares {
    display: flex;
  }

  .wares-text {
    width: 60vw;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 5px;
  }
}
</style>