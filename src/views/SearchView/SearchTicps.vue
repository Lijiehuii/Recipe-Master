<template>
  <div class="suggests">
    <div class="history" v-show="historySearchData.length > 0">
      <p class="history-title">
        <span>历史搜索</span>
        <span @click="$emit('reset-history-data')"
          ><van-icon name="delete-o"
        /></span>
      </p>
      <div class="suggests-con">
        <p
          class="suggest"
          v-for="(h, i) in historySearchData"
          :key="i"
          @click="getTicp(h)"
        >
          {{ h }}
        </p>
      </div>
    </div>
    <div class="hot">
      <p class="suggests-title">热门搜索</p>
      <div class="suggests-con">
        <p
          class="suggest"
          :class="{ three: i < 3 }"
          v-for="(s, i) in hotData"
          :key="s.type + i"
          @click="getTicp(s.name)"
        >
          {{ s.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    historySearchData: Array,
  },
  data() {
    return {
      hotData: [],
    };
  },
  created() {
    this.getHotData();
  },
  methods: {
    getHotData() {
      this.$axios.get("/api-json/search/hot.json").then(({ data }) => {
        this.hotData = data.result.suggests;
      });
    },
    getTicp(ticp) {
      this.$emit("set-keyword", ticp);
      this.$emit("get-history-data", ticp);
      this.$router.push({
        path: `${this.$route?.path}`,
        query: {
          keyWord: ticp,
          time: new Date().getTime(),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.suggests {
  width: 100vw;
  padding: 10px 20px;

  .history {
    margin-bottom: 15px;
  }

  .history-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }

  .suggests-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }
  .suggests-con {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .suggest {
      font-size: 12px;
      padding: 7px 10px;
      margin-bottom: 10px;
      margin-right: 10px;
      border-radius: 5px;
      background-color: rgb(250, 250, 250);

      &.three {
        border: 1px solid rgb(211, 73, 64);
        color: rgb(211, 73, 64);
      }
    }
  }
}
</style>