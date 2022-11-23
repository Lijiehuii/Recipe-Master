<template>
  <div class="video" ref="video" @click="recipeDetile(videoData.r.id)">
    <div class="video-top">
      <img :src="videoData.r?.a.p" />
      <p class="user-desc">
        <span class="user-name">{{ videoData.r?.a.n }}</span>
        <span class="user-lv">LV.{{ videoData.r?.a.lvl }}</span>
      </p>
    </div>
    <video
      ref="videoPlay"
      :autoplay="videoData.play"
      @click.stop="videoPlay(videoData.r?.id)"
    >
      <source width="100vw" :src="videoData.r?.vu" />
    </video>
    <div class="video-desc">
      <van-notice-bar
        wrapable
        :scrollable="false"
        :text="videoData.r?.stdname"
      />
    </div>
    <div class="radio-bottom">
      <div class="bottom-left" v-if="videoData.r?.collect_users">
        <p class="collection-users">
          <img
            v-for="c in videoData.r?.collect_users"
            :key="c.id"
            v-lazy="c.p"
          />
        </p>
        <p class="collection-count">{{ videoData.r?.collect_count_text }}</p>
      </div>
      <div class="bottom-left" v-if="!videoData.r?.collect_users">
        <van-icon name="eye-o" />
        <p class="vc-count">{{ videoData.r?.vc }} 浏览</p>
      </div>
      <div
        class="bottom-right collection"
        @click.stop="collection(videoData.r.id)"
      >
        <transition-group name="collection">
          <div class="collection" key="star - o">
            <van-icon
              size="20px"
              v-if="!videoData.collection"
              color="#000"
              name="star-o"
            />
          </div>
          <div class="collection" key="star">
            <van-icon
              size="20px"
              v-if="videoData.collection"
              color="rgb(254, 198, 51)"
              name="star"
              key="star"
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
    videoData: Object,
    scrollTopGet: Number,
    containerheight: Number,
  },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {
    ...mapMutations([
      "setCollectionRecipeData",
      "filterUncollectionRecipeData",
    ]),
    videoPlay(id) {
      this.$emit("set-video-pay", id);
      if (!this.videoData.play) {
        this.$refs.videoPlay.play();
      } else if (this.videoData.play) {
        this.$refs.videoPlay.pause();
      }
    },

    recipeDetile(id) {
      this.$router.push({
        path: "/home/recipe",
        query: {
          id,
        },
      });
    },
    collection(id) {
      console.log(this.videoData);
      if (this.videoData.collection) {
        Toast("已取消收藏菜谱 " + this.videoData.r?.stdname);
        this.filterUncollectionRecipeData(this.videoData.r.id);
      } else if (!this.videoData.collection) {
        let collectionRecipe = {
          id: this.videoData.r.id,
          img: this.videoData.r.img,
          stdname: this.videoData.r.stdname,
          a: {
            id: this.videoData.r.a.id,
            n: this.videoData.r.a.n,
            p: this.videoData.r.a.p,
          },
        };
        this.setCollectionRecipeData(collectionRecipe);
        Toast("已收藏菜谱 " + this.videoData.r?.stdname);
      }
      console.log(this.collectionRecipeData);
      this.$emit("set-collection", id);
    },
  },
  watch: {
    scrollTopGet(newVal) {
      let firstTop = this.containerheight / 5;
      let secondTop = firstTop * 2;
      let dif = this.$refs.video.offsetTop - newVal;
      if (dif >= firstTop && dif <= secondTop) {
        // console.log("firstTo=>", firstTop);
        // console.log("secondTop=>", secondTop);
        // console.log("dif=>", dif);
        // console.log(this.videoData);
        this.videoPlay(this.videoData.r?.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  width: 100vw;
  display: flex;
  flex-direction: column;

  .video-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    img {
      display: block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 999px;
    }

    .user-name {
      font-size: 16px;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    .user-lv {
      font-size: 12px;
      font-style: italic;
      color: rgb(254, 198, 51);
      margin-left: 10px;
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
  }
}
</style>