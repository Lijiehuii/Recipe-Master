<template>
  <div class="data">
    <p class="data-item">
      <span class="data-count">{{ userInfoData.following_count_text }}</span>
      <span class="data-title">关注</span>
    </p>
    <p class="data-item">
      <span class="data-count">{{ userInfoData.followers_count_text }}</span>
      <span class="data-title">粉丝</span>
    </p>
    <p class="data-item">
      <span class="data-count">{{ userInfoData.favoed_count_text }}</span>
      <span class="data-title">被收藏</span>
    </p>
    <p class="data-item">
      <span class="data-count">{{ userInfoData.noted_count_text }}</span>
      <span class="data-title">被学做</span>
    </p>
    <p class="data-item">
      <span class="data-count">{{ userInfoData.point_text }}</span>
      <span class="data-title">经验值</span>
    </p>
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
.data {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin-bottom: 20px;

  .data-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .data-title {
      margin-top: 5px;
      color: #999;
      font-size: 13px;
    }
  }
}
</style>