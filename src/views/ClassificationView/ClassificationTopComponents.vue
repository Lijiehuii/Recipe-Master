<template>
  <div class="Classification-top">
    <p class="title">菜谱分类</p>
    <div class="search-icon" @click="classSearch">
      <van-icon name="search" style="font-size: 18px" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    classSearch() {
      this.$router.push({ path: `/classification/search` });
    },
  },
};
</script>

<style lang="scss" scoped>
.Classification-top {
  width: 100vw;
  height: 54px;
  border-bottom: 1px solid #999;
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>