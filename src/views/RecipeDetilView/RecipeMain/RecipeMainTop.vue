<template>
  <div class="main-top">
    <img :src="recipeData?.photo_path" />
    <div class="top">
      <p class="recipe-title">{{ recipeData.title }}</p>
      <div class="recipe-desc">
        <span class="view">
          <van-icon name="browsing-history-o" />浏览{{
            recipeData.views_count_text
          }}</span
        >
        <div class="collection">
          <span class="collection-count">
            收藏
          </span>
          <div
            class="bottom-right collection"
            @click.stop="collection(recipeData.cook_id)"
          >
            <div class="star" key="star - o">
              <van-icon
                size="18px"
                v-if="!recipeData.collection"
                color="#000"
                name="star-o"
              />
            </div>
            <div class="star" key="star">
              <van-icon
                size="18px"
                v-if="recipeData.collection"
                color="rgb(254, 198, 51)"
                name="star"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="author">
        <div class="left">
          <img :src="recipeData.user?.user_photo" />
          <p class="author-mag">
            <span class="author-name">{{ recipeData.user?.nickname }}</span>
            <span class="author-lvl">LV.{{ recipeData.user?.lvl }}</span>
          </p>
        </div>
        <div class="top-right">
          <div
            class="follow-expert"
            :class="{ follow: followUserData.follow }"
            @click.stop="followWith(followUserData)"
          >
            <div v-if="!followUserData?.follow">关注</div>
            <div
              :class="{ follow: followUserData.follow }"
              v-if="followUserData?.follow"
            >
              已关注
            </div>
          </div>
        </div>
      </div>
      <div class="cook-story">
        <p class="story-head">{{ storyHead }}</p>
        <p>{{ storytext }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    recipeData: Object,
    scrollTopGet: Number,
    userData: Object,
    followUserData: Object,
  },
  created() {
    console.log(this.recipeData);
  },
  computed: {
    ...mapState(["followUsersData", "collectionRecipeData"]),
    storyHead() {
      return this.recipeData?.cookstory?.split("\n")[0];
    },
    storytext() {
      return this.recipeData?.cookstory?.split("\n")[2];
    },
  },
  methods: {
    ...mapMutations([
      "getUserInfoFollow",
      "setUserInfoFollow",
      "removeUnfollowExpertData",
      "setExpertsFolloeData",
      "setCollectionRecipeData",
      "filterUncollectionRecipeData",
    ]),
    followWith(user) {
      if (!user.follow) {
        this.getUserInfoFollow(user);
        this.setUserInfoFollow();
        this.$emit("set-user-follow");
      } else if (user.follow) {
        let item = { id: user.user_id };
        this.removeUnfollowExpertData(item);
        this.setUserInfoFollow();
        this.$emit("set-user-follow");
      }
    },
    collection(id) {
      console.log(id);
      if (this.recipeData.collection) {
        Toast("已取消收藏菜谱 " + this.recipeData.title);
        this.filterUncollectionRecipeData(this.recipeData?.cook_id);
      } else if (!this.recipeData.collection) {
        let collectionRecipe = {
          id: this.recipeData.cook_id,
          img: this.recipeData.thumb_path,
          stdname: this.recipeData.title,
          a: {
            id: this.recipeData.user.user_id,
            n: this.recipeData.user.nickname,
            p: this.recipeData.user.user_photo,
          },
        };
        this.setCollectionRecipeData(collectionRecipe);
        Toast("已收藏菜谱 " + this.recipeData.title);
      }
      console.log(this.collectionRecipeData);
      this.$emit("set-collection");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-top {
  width: 100vw;
  img {
    display: block;
    width: 100vw;
  }
  .top {
    padding: 10px 20px;

    .recipe-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .recipe-desc {
      display: flex;
      justify-content: space-around;
      align-items: center;
      letter-spacing: 1.5px;
      font-size: 14px;

      .collection-count {
        display: flex;
        align-items: center;
      }
      .collection {
        display: flex;
      }
    }

    .author {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;

      .left {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          display: block;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          margin-right: 10px;
        }

        .author-lvl {
          font-size: 12px;
          font-style: italic;
          color: rgb(254, 198, 51);
          margin-left: 10px;
        }
      }

      .top-right {
        display: flex;
        justify-content: center;
        align-items: center;
        .follow-expert {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 20px;
          font-size: 12px;
          font-weight: bold;
          background-color: rgb(254, 198, 51);
          border-radius: 999px;
          margin-right: 10px;

          &.follow {
            background-color: rgb(246, 246, 246);
          }
        }
      }
    }

    .cook-story {
      display: flex;
      flex-direction: column;
      line-height: 30px;
      .story-head {
        margin: 10px 0;
      }
    }
  }
}
</style>