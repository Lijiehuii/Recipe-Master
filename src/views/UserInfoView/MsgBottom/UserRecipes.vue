<template>
  <div class="recipes">
    <div
      class="recipe-item"
      v-for="(r, i) in recipesData"
      :key="i"
      @click="goToRecipesDetail(r.r.id)"
    >
      <div class="img-con">
        <img :src="r.r.p" />
      </div>
      <div class="recipe-desc">
        <p class="view">{{ r.r.recommend_label }}</p>
        <p class="name">{{ r.r.n }}</p>
      </div>
    </div>
    <div class="empty" key="empty">
      <van-empty
        v-if="recipesData?.length == 0"
        class="custom-image"
        image="/images/empty.jpg"
        description="该用户还没有任何收藏~"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      recipesData: [],
    };
  },
  created() {
    this.getUserRecipes();
  },
  methods: {
    getUserRecipes() {
      this.$axios
        .get(
          `https://apis.netstart.cn/douguo/user/urecipes/${this.userId}/0/20`
        )
        .then(({ data }) => {
          this.recipesData = data.result.list;
          console.log(this.recipesData);
        });
    },
    goToRecipesDetail(id) {
      this.$router.push({
        path: "/home/recipe",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recipes {
  padding: 15px 0;

  .recipe-item {
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .img-con {
      position: relative;
      width: 100vw;
      height: 200px;
      overflow: hidden;
      img {
        position: absolute;
        width: 100vw;
        height: 200px;
        z-index: 2;
      }
    }

    .recipe-desc {
      width: 100vw;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 20px;
    }
  }
}
</style>