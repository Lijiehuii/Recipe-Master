<template>
  <div class="mine-main">
    <div class="numerical-value">
      <p class="item" v-for="(t, i) in mineType" :key="i">
        <span class="count">{{ t.count }}</span>
        <span class="title">{{ t.title }}</span>
      </p>
    </div>
    <div class="list-item">
      <p class="list">
        <span class="title">我的菜谱</span><van-icon name="arrow" />
      </p>
      <p class="list">
        <span class="title">我的收藏夹</span><van-icon name="arrow" />
      </p>
      <p class="list">
        <span class="title">我的笔记</span><van-icon name="arrow" />
      </p>
      <p class="list">
        <span class="title">浏览历史</span><van-icon name="arrow" />
      </p>
      <p class="list">
        <span class="title">我的设置</span><van-icon name="arrow" />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      mineType: "",
    };
  },
  created() {
    this.mineType = [
      {
        title: "已收藏",
        count: this.recipeCount,
      },
      {
        title: "已关注",
        count: this.followCount,
      },
      {
        title: "被收藏",
        count: 0,
      },
      {
        title: "粉丝",
        count: 0,
      },
    ];
  },
  computed: {
    ...mapState(["followUsersData", "collectionRecipeData"]),
    ...mapGetters(["followCount", "recipeCount"]),
  },
  watch: {
    followUsersData(newVal) {
      this.mineType[1].count = newVal.length;
    },
    collectionRecipeData(newVal) {
      this.mineType[0].count = newVal.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.mine-main {
  width: 100vw;
  padding: 10px 20px;
  margin-top: 10px;
  .numerical-value {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .item {
      width: calc(100% / 4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      font-size: 18px;

      .title {
        color: #999;
        margin-top: 5px;
      }
    }
  }

  .list-item {
    display: flex;
    flex-direction: column;

    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background: #eee;
      margin-bottom: 10px;
      border-radius: 10px;
    }
  }
}
</style>