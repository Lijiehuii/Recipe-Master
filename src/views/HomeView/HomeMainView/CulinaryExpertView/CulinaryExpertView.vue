<template>
  <div class="experts-con">
    <van-pull-refresh
      style="height: calc(100vh - 154px)"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="experts">
        <UserCard
          v-for="(expert, i) in expertsData"
          :key="expert.id + i"
          :expert="expert"
        />
      </div>
    </van-pull-refresh>
    <van-loading size="24px" v-if="!expertsData" vertical
      >加载中...</van-loading
    >
  </div>
</template>

<script>
// import BScroll from "@better-scroll/core";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
import UserCard from "@/components/UserCard.vue";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.getFfeedsData();
  },
  computed: {
    ...mapState(["expertsData", "expertOffset", "followUsersData"]),
  },
  methods: {
    ...mapMutations([
      "setExpertsData",
      "setExpertsOffset",
      "resetExpertOffset",
      "clearnExpertsData",
    ]),
    getFfeedsData() {
      console.log("正在请求数据");
      this.$axios
        .get(
          // `https://apis.netstart.cn/douguo/home/ffeeds/${this.expertOffset}/20`
          // "/follow.json"
          `/api-json/home/users/ffeeds-${this.expertOffset}-20.json`
          // `/api-json/home/recommend/recommend-${this.expertOffset}-10.json`
        )
        .then(({ data }) => {
          console.log("recommend", data);
          let rfs = data.result.rfs;
          if (rfs) {
            let newData = rfs.map((item) => {
              return {
                ...item.u,
                follow: false,
                collection: "",
                like: "",
              };
            });

            for (let i = 0; i < newData.length; i++) {
              for (let j = 0; j < this.followUsersData.length; j++) {
                if (newData[i].id == this.followUsersData[j].id) {
                  newData[i] = this.followUsersData[j];
                }
              }
            }

            for (let i = 0; i < newData.length; i++) {
              for (let j = i + 1; j < newData.length; j++) {
                if (newData[i].id == newData[j].id) {
                  let del = j;
                  newData.splice(del, 1);
                }
              }
            }

            // newData = newData.filter((d) => {
            //   return !d.follow;
            // });

            this.setExpertsData(newData);
            console.log("请求数据成功!");
          }
          // } else if (!rfs) {
          //   this.resetExpertOffset();
          //   this.getFfeedsData();
          // }
        });
    },
    onRefresh() {
      if (this.expertOffset <= 9) {
        this.clearnExpertsData();
        let newOffset = this.expertOffset + 1;
        this.setExpertsOffset(newOffset);
        this.getFfeedsData();
        setTimeout(() => {
          Toast("刷新成功");
          this.isLoading = false;
        }, 2000);
      } else {
        Toast("没有更多了！");
      }
      // console.log(newOffset);
    },
  },
  components: {
    UserCard,
  },
};
</script>

<style lang="scss" scoped>
.experts-con {
  position: absolute;
  top: 94px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 144px);
  overflow: auto;

  .experts {
    width: 100vw;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      background-color: transparent;
    }
  }
}
</style>



