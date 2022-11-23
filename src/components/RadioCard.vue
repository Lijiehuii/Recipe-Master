<template>
  <div class="radio" @click.stop="recipeDetil(CardList.r.id)">
    <div class="radio-top">
      <div class="user" @click.stop="goToUserInfo(CardList.r.a.id)">
        <img v-lazy="CardList.r.a.p" />
        <p class="user-text">
          <span class="user-name">{{ CardList.r.a.n }}</span
          ><span class="user-level"
            >LV.{{ CardList.r.a.lvl ? CardList.r.a.lvl : "0" }}</span
          >
        </p>
      </div>
      <div class="feedback" @click.stop="show = true">
        <van-icon size="20px" name="ellipsis" />
      </div>
    </div>
    <div class="unlike" @click.stop="">
      <van-dialog
        style="z-index: 400"
        v-model="show"
        :title="'对 ' + CardList.r.stdname + ' 不感兴趣'"
        show-cancel-button
        @confirm="unlike(CardList.r.id)"
      ></van-dialog>
    </div>
    <div class="radio-pic">
      <p class="radio-name">{{ CardList.r.stdname }}</p>
      <img v-lazy="CardList.r.p" />
      <p v-if="CardList.r.fc > 0" class="follow">
        <span class="follow-count">已有{{ CardList.r.fc }}人学做了这道菜</span>
        <van-icon name="arrow" />
      </p>
    </div>
    <div class="radio-desc">
      <van-notice-bar wrapable :scrollable="false" :text="CardList.r.n" />
    </div>
    <div class="radio-bottom">
      <div class="bottom-left" v-if="CardList.r.collect_users">
        <p class="collection-users">
          <img v-for="c in CardList.r.collect_users" :key="c.id" v-lazy="c.p" />
        </p>
        <p class="collection-count">{{ CardList.r.collect_count_text }}</p>
      </div>
      <div class="bottom-left" v-if="!CardList.r.collect_users">
        <van-icon name="eye-o" />
        <p class="vc-count">{{ CardList.r.vc }} 浏览</p>
      </div>
      <div
        class="bottom-right collection"
        @click.stop="collection(CardList.r.id)"
      >
        <transition-group name="collection">
          <div class="star" key="star - o">
            <van-icon
              size="20px"
              v-if="!CardList.collection"
              color="#000"
              name="star-o"
            />
          </div>
          <div class="star" key="star">
            <van-icon
              size="20px"
              v-if="CardList.collection"
              color="rgb(254, 198, 51)"
              name="star"
            />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    CardList: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {
    ...mapMutations([
      "setCollectionRecipeData",
      "filterUncollectionRecipeData",
    ]),
    recipeDetil(id) {
      this.$router.push({
        path: "/home/recipe",
        query: {
          id,
        },
      });
    },
    unlike(id) {
      console.log(id);
      this.$emit("fliter-unlike", id);
    },
    collection(id) {
      console.log(this.CardList);
      console.log(id);
      if (this.CardList.collection) {
        Toast("已取消收藏菜谱 " + this.CardList.r?.stdname);
        this.filterUncollectionRecipeData(this.CardList.r.id);
      } else if (!this.CardList.collection) {
        let collectionRecipe = {
          id: this.CardList.r.id,
          img: this.CardList.r.img,
          stdname: this.CardList.r.stdname,
          a: {
            id: this.CardList.r.a.id,
            n: this.CardList.r.a.n,
            p: this.CardList.r.a.p,
          },
        };
        this.setCollectionRecipeData(collectionRecipe);
        Toast("已收藏菜谱 " + this.CardList.r?.stdname);
      }
      console.log(this.collectionRecipeData);
      this.$emit("set-collection", id);
    },
    goToUserInfo(id) {
      let route = this.$route.name;
      this.$router.push({
        path: `${route}/userinfo`,
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.collection-enter {
  opacity: 0.5;
}

.collection-enter-active {
  transition: all 0.3s linear;
}

.collection-enter-to {
  opacity: 1;
}

.radio {
  width: 100vw;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;

  .radio-top {
    width: 100vw;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user {
      display: flex;
      align-items: center;

      img {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 999px;
        margin-right: 10px;
      }

      .user-name {
        margin-right: 10px;
        font-weight: 600;
        letter-spacing: 1.5px;
      }

      .user-level {
        font-size: 12px;
        font-style: italic;
        color: rgb(254, 198, 51);
      }
    }
  }
  .radio-pic {
    width: 100vw;
    position: relative;
    font-size: 12px;
    color: #fff;

    img {
      display: block;
      width: 100%;
    }

    .radio-name {
      width: 100vw;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 16px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      );
    }

    .follow {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 10px;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)
      );
    }
  }

  .radio-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    .bottom-left {
      display: flex;
      align-items: center;

      .collection-users {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;

        img {
          display: block;
          width: 25px;
          height: 25px;
          border: 2px solid #fff;
          background-color: #fff;
          border-radius: 999px;
          margin-left: -7px;

          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }

      .collection-count {
        font-size: 12px;
      }

      .vc-count {
        margin-left: 10px;
      }
    }

    .bottom-right {
      position: relative;

      .star {
        position: absolute;
        top: -10px;
        right: 0px;
      }
    }
  }
}
</style>