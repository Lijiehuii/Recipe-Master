<template>
  <div class="recommend">
    <div class="recommend-main" v-if="recommendData">
      <div class="main">
        <BannerShow :banner="banner" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="card">
            <RecommendCard
              v-for="(item, i) in CardList"
              :key="i"
              :type="item?.type"
              :CardList="item"
              @set-collection="setCollection"
              @set-love="setLove"
              @fliter-unlike="unlike"
              @fliter-unlike-note="unlikenote"
            />
          </div>
        </van-pull-refresh>
      </div>
    </div>
    <van-loading
      style="margin-top: 10px"
      size="24px"
      v-if="!recommendData"
      vertical
      >数据加载中，请耐心等候...</van-loading
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BannerShow from "./BannerShow.vue";
import RecommendCard from "./RecommendCard.vue";
import { Toast } from "vant";

export default {
  components: {
    BannerShow,
    RecommendCard,
  },
  data() {
    return {
      recommendData: "",
      banner: [],
      CardList: [],
      isLoading: false,
    };
  },
  created() {
    this.getRecommendData();
  },
  computed: {
    ...mapState(["recommendDataList", "collectionRecipeData"]),
  },
  methods: {
    ...mapMutations(["setRecommendDataList"]),
    getRecommendData() {
      this.$axios
        .get(
          // "https://apis.netstart.cn/douguo/home/recommended/0/10"
          "/api-json/home/recommend/recommend-0-10.json"
          // "./recommend0-10.json"
        )
        .then(({ data }) => {
          this.recommendData = data.result;
          this.banner = this.recommendData.banner;
          this.CardList = this.recommendData.list.map((e) => {
            if (e?.type == 1 || e?.type == 3) {
              if (e?.type == 1) {
                return {
                  ...e,
                  like: true,
                  collection: false,
                };
              } else if (e?.type == 3) {
                return {
                  ...e,
                  like: true,
                  love: false,
                };
              }
            }
            return e;
          });
          for (let i = 0; i < this.collectionRecipeData.length; i++) {
            this.CardList = this.CardList.map((c) => {
              if (c.r?.id == this.collectionRecipeData[i].id) {
                c.r.collect_count_text =
                  parseInt(c.r?.collect_count_text) + 1 + "人收藏";
                return {
                  ...c,
                  like: true,
                  collection: true,
                };
              }
              return c;
            });
          }
          console.log("this.CardList", this.CardList);
        });
    },
    setCollection(id) {
      this.CardList = this.CardList.map((c) => {
        if (id == c.r?.id) {
          if (!c.collection) {
            c.r.collect_count_text =
              parseInt(c.r?.collect_count_text) + 1 + "人收藏";
            return {
              ...c,
              collection: !c.collection,
            };
          } else if (c.collection) {
            c.r.collect_count_text =
              parseInt(c.r?.collect_count_text) - 1 + "人收藏";
            return {
              ...c,
              collection: !c.collection,
            };
          }
        }
        return c;
      });
    },
    setLove(id) {
      console.log("设置");
      this.CardList = this.CardList.map((n) => {
        if (id == n.note?.id) {
          if (!n.love) {
            n.note.like_count = n.note?.like_count + 1;
            return {
              ...n,
              love: !n.love,
            };
          } else if (n.love) {
            n.note.like_count = n.note?.like_count - 1;
            return {
              ...n,
              love: !n.love,
            };
          }
        }
        return n;
      });
    },
    unlike(id) {
      this.CardList = this.CardList.filter((c) => {
        return c.r?.id != id;
      });
    },
    unlikenote(id) {
      this.CardList = this.CardList.filter((c) => {
        return c.note?.id != id;
      });
    },
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 2000);
    },
  },
  watch: {
    collectionRecipeData(newVal, oldVal) {
      console.log("newVal=>", newVal);
      console.log("oldVal=>", oldVal);
      for (let i = 0; i < newVal.length; i++) {
        this.CardList = this.CardList.map((c) => {
          if (c.r?.id == newVal[i].id && !c.collection) {
            c.r.collect_count_text =
              parseInt(c.r?.collect_count_text) + 1 + "人收藏";
            return {
              ...c,
              like: true,
              collection: true,
            };
          }
          return c;
        });
      }
      let diff = [];
      if (newVal.length < oldVal.length) {
        for (let i = 0; i < newVal.length; i++) {
          for (let j = 0; j < oldVal.length; j++) {
            if (newVal[i].id == oldVal[j].id) {
              oldVal.splice(j, 1);
              j--;
              console.log("去重后的oldVal=>", oldVal);
            }
          }
        }
        console.log("diff=>", diff);
        this.CardList = this.CardList.map((c) => {
          if (c.r?.id == oldVal[0].id && c.collection) {
            c.r.collect_count_text =
              parseInt(c.r?.collect_count_text) - 1 + "人收藏";
            return {
              ...c,
              like: true,
              collection: false,
            };
          }
          return c;
        });
      } else if (newVal.length == 0 && oldVal.length == 1) {
        for (let i = 0; i < oldVal.length; i++) {
          this.CardList = this.CardList.map((c) => {
            if (c.r?.id == oldVal[i].id && c.collection) {
              c.r.collect_count_text =
                parseInt(c.r?.collect_count_text) - 1 + "人收藏";
              return {
                ...c,
                like: true,
                collection: false,
              };
            }
            return c;
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: absolute;
  top: 94px;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 100vw;
  height: calc(100vh - 144px);
  overflow: auto;

  .main {
    width: 100vw;
    height: 100%;
    overflow: auto;

    .card {
      width: 100vw;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>