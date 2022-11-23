<template>
  <div class="cllection-recipe" @click="goToRecipeDetail(recipe.id)">
    <div class="recipe">
      <img class="food-img" :src="recipe.img" />
      <div class="recipe-msg">
        <p class="recipe-name">{{ recipe.stdname }}</p>
        <div class="user">
          <img :src="recipe?.a?.p" />
          <p class="user-name">{{ recipe.a.n }}</p>
        </div>
      </div>
    </div>
    <div class="collection" @click="filterUncollectionRecipeData(recipe.id)">
      <div class="star" key="star">
        <van-icon size="20px" color="rgb(254, 198, 51)" name="star" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    recipe: Object,
  },
  methods: {
    ...mapMutations(["filterUncollectionRecipeData"]),
    goToRecipeDetail(id) {
      this.$router.push({
        path: "/collection/recipe",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cllection-recipe {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 10px 20px;

  .recipe {
    display: flex;

    .food-img {
      display: block;
      flex: 0 0 35vw;
      width: 35vw;
      height: 25vw;
      margin-right: 10px;
      border-radius: 10px;
    }

    .recipe-msg {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .recipe-name {
        font-size: 13px;
        line-height: 20px;
      }

      .user {
        display: flex;
        align-items: center;
        font-size: 12px;
        img {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          border-radius: 999px;
        }
      }
    }
  }

  .collection {
    position: relative;
    align-self: flex-end;

    .star {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }
}
</style>