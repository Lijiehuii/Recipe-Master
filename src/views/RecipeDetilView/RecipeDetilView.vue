<template>
  <div class="recipe" @scroll.passive="pageScroll($event)">
    <RecipeTop
      :userData="userData"
      :scrollTopGet="scrollTopGet"
      :followUserData="followUserData"
      @set-user-follow="setUserFollow"
    />
    <div class="recipe-wrap" v-if="recipeData">
      <RecipeMain
        :recipeData="recipeData"
        :recipeId="recipeId"
        :followUserData="followUserData"
        :userData="userData"
        @set-user-follow="setUserFollow"
        @set-collection="setCollection"
      />
    </div>
    <div class="loading">
      <van-loading size="24px" v-if="!recipeData" vertical
        >加载中...</van-loading
      >
    </div>
  </div>
</template>

<script>
import RecipeTop from "@/components/RecipeTop.vue";
import RecipeMain from "./RecipeMain/RecipeMain.vue";
import { mapState } from "vuex";
export default {
  components: {
    RecipeTop,
    RecipeMain,
  },
  data() {
    return {
      recipeId: "",
      userId: "",
      userData: {},
      followUserData: {},
      recipeData: "",
      scrollTopGet: 0,
    };
  },
  created() {
    this.recipeId = this.$route.query.id;
    this.getRecipeData(this.recipeId);
  },
  computed: {
    ...mapState(["followUsersData", "collectionRecipeData"]),
  },
  methods: {
    getRecipeData(id) {
      this.userId = "";
      this.$axios
        .get(`https://apis.netstart.cn/douguo/recipe/detail/${id}`)
        .then(({ data }) => {
          if (data.state == "success") {
            this.recipeData = { ...data.result?.recipe, collection: false };
            let user = data.result?.recipe.user;
            if (this.followUsersData.length > 0) {
              for (let i = 0; i < this.followUsersData.length; i++) {
                if (user.user_id == this.followUsersData[i].id) {
                  this.userData = { ...user, follow: true };
                }
              }
            } else {
              this.userData = { ...user, follow: false };
            }

            for (let i = 0; i < this.collectionRecipeData.length; i++) {
              if (this.recipeData.cook_id == this.collectionRecipeData[i].id) {
                this.recipeData.collection = true;
                this.recipeData.favo_counts_text++;
              }
            }

            console.log("user=>", user);
            console.log(this.userData);
            this.userData = { ...user, follow: this.userData.follow };
            this.userId = user.user_id;
            this.recipeData.user = this.userData;
            this.getUser(this.userId);
          }
        });
    },
    getUser(userid) {
      this.userId = "";
      this.followUserData = {};
      this.$axios
        .get(`https://apis.netstart.cn/douguo/user/info/${userid}`)
        .then(({ data }) => {
          this.followUserData = { ...data.result.user, follow: false };
          for (let i = 0; i < this.followUsersData.length; i++) {
            if (this.followUserData.user_id == this.followUsersData[i].id) {
              this.followUserData.follow = true;
            }
          }
        });
    },
    setUserFollow() {
      this.followUserData.follow = !this.followUserData.follow;
    },
    pageScroll(e) {
      this.scrollTopGet = e.target.scrollTop;
    },
    setCollection() {
      if (!this.recipeData.collection) {
        console.log(123);
        this.recipeData.collection = !this.recipeData.collection;
        this.recipeData.favo_counts_text++;
      } else if (this.recipeData.collection) {
        this.recipeData.collection = !this.recipeData.collection;
        this.recipeData.favo_counts_text--;
      }
    },
  },
  watch: {
    $route(newVal) {
      if (newVal.name == "recipe" && newVal.query.id) {
        this.recipeData = "";
        this.recipeId = newVal.query.id;
        this.getRecipeData(this.recipeId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: #fff;
  overflow: auto;
  padding-bottom: 40px;

  .loading {
    margin-top: 10px;
  }
}
</style>