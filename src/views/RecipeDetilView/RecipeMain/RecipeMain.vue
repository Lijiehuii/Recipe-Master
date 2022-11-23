<template>
  <div class="mian">
    <RecipeMainTop
      :recipeData="recipeData"
      :userData="userData"
      :followUserData="followUserData"
      @set-user-follow="setUserFollow"
      @set-collection="setCollection"
    />
    <RecipeMainMiddle :recipeData="recipeData" />
    <RecipeMainBottom :recipeData="recipeData" />
  </div>
</template>

<script>
import RecipeMainTop from "./RecipeMainTop.vue";
import RecipeMainMiddle from "./RecipeMainMiddle.vue";
import RecipeMainBottom from "./RecipeMainBottom.vue";
export default {
  props: {
    recipeData: [Object, String],
    userData: Object,
    followUserData: Object,
  },
  components: { RecipeMainTop, RecipeMainMiddle, RecipeMainBottom },
  methods: {
    setUserFollow() {
      this.$emit("set-user-follow");
    },
    setCollection(){
      this.$emit("set-collection");
    }
  },
};
</script>