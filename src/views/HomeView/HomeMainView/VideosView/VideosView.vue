<template>
  <div class="videos" @scroll="videoPageScroll($event)" ref="videos">
    <VideoCard
      v-for="(v, i) in videosData"
      v-show="v.type == 1"
      :key="i"
      :videoData="v"
      :scrollTopGet="scrollTopGet"
      :containerheight="containerheight"
      @set-video-pay="setVideoStatu"
      @stop-play="stopPlay"
      @set-collection="setCollection"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoCard from "./VideoCard.vue";
export default {
  components: {
    VideoCard,
  },
  data() {
    return {
      videosData: [],
      scrollTopGet: 0,
      containerheight: 0,
    };
  },
  created() {
    this.getVideosData();
  },
  mounted() {
    this.containerheight = this.$refs.videos.offsetHeight;
  },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {
    getVideosData() {
      this.$axios
        .get(
          // "https://apis.netstart.cn/douguo/home/videos/0/20"
          "/api-json/home/video/video-0-20.json"
        )
        .then(({ data }) => {
          this.videosData = data.result.list.map((v) => {
            if (v.type == 1) {
              return {
                ...v,
                collection: false,
                play: false,
              };
            }
            return v;
          });
          this.videosData[0].play = true;
          for (let i = 0; i < this.collectionRecipeData.length; i++) {
            this.videosData = this.videosData.map((v) => {
              if (v.r?.id == this.collectionRecipeData[i].id) {
                return {
                  ...v,
                  collection: true,
                };
              }
              return v;
            });
          }
          console.log(this.videosData);
        });
    },
    videoPageScroll(e) {
      this.scrollTopGet = e.target.scrollTop;
    },
    setVideoStatu(id) {
      this.videosData = this.videosData.map((v) => {
        if (v.r?.id == id) {
          return {
            ...v,
            play: !v.play,
          };
        }
        return {
          ...v,
          play: false,
        };
      });
    },
    stopPlay(id) {
      this.videosData = this.videosData.map((v) => {
        if (v.r?.id == id) {
          return {
            ...v,
            play: false,
          };
        }
        return v;
      });
    },
    setCollection(id) {
      console.log("view", id);
      console.log(this.videosData);
      this.videosData = this.videosData.map((v) => {
        if (id == v.r?.id) {
          console.log(v.r?.id);
          if (!v.collection) {
            v.r.collect_count_text =
              parseInt(v.r?.collect_count_text) + 1 + "人收藏";
            return {
              ...v,
              collection: !v.collection,
            };
          } else if (v.collection) {
            v.r.collect_count_text =
              parseInt(v.r?.collect_count_text) - 1 + "人收藏";
            return {
              ...v,
              collection: !v.collection,
            };
          }
        }
        return v;
      });
    },
  },
  watch: {
    collectionRecipeData(newVal, oldVal) {
      console.log("newVal=>", newVal);
      console.log("oldVal=>", oldVal);
      for (let i = 0; i < newVal.length; i++) {
        this.videosData = this.videosData.map((c) => {
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
      if (newVal.length > 0 && oldVal.length > 0) {
        for (let i = 0; i < newVal.length; i++) {
          for (let j = 0; j < oldVal.length; j++) {
            if (newVal[i].id != oldVal[j].id) {
              diff = [...diff, oldVal[j]];
            }
          }
        }
        console.log("diff=>", diff);
      } else if (newVal.length == 0) {
        for (let i = 0; i < oldVal.length; i++) {
          this.videosData = this.videosData.map((c) => {
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
.videos {
  position: absolute;
  top: 94px;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 100vw;
  height: calc(100vh - 154px);
  overflow: auto;
}
</style>