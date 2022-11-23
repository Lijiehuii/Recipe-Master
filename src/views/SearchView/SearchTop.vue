<template>
  <div class="search-control">
    <div @click="goBack()">
      <van-icon size="25px" name="arrow-left" />
    </div>
    <div class="search-input">
      <van-search
        v-model="keyword"
        @input="entering"
        placeholder="请输入搜索关键词"
        :clearable="false"
      />
    </div>
    <div @click="toSearch">搜索</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    keyWord: String,
    LoadingShow: Boolean,
  },
  data() {
    return {
      keyword: "",
      historySearchData: [],
    };
  },
  created() {
    this.keyword = this.keyWord;
  },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {
    entering() {
      console.log("正在输入=>", this.keyword);
      this.$emit("set-keyword", this.keyword);
    },
    goBack() {
      this.$emit("reset-search-data");
      this.$emit("reset-keyWord");
      let route = this.$route.params.route;
      this.$router.push({ name: `${route}` });
    },

    toSearch() {
      this.$emit("is-Searching");
      if (this.keyword) {
        this.$emit("get-history-data", this.keyword);
        this.$axios
          .get(
            `https://apis.netstart.cn/douguo/recipe/search?keyword=${this.keyword}`
            // "/api-json/search/keyword/今日开运菜.json"
            // "/api-json/search/keyword/土豆饼.json"
            // "/api-json/search/ke yword/今日开运菜.json"
          )
          .then(({ data }) => {
            if (data) {
              let newData = data.result.list.map((l) => {
                for (let i = 0; i < this.collectionRecipeData.length; i++) {
                  if (l.r.id == this.collectionRecipeData[i].id) {
                    return {
                      ...l,
                      collection: true,
                    };
                  }
                }
                return {
                  ...l,
                  collection: false,
                };
              });
              console.log(newData);
              this.$emit("get-search-data", newData);
              this.$emit("search-complete")
            }
          });
      }
    },
  },
  watch: {
    $route(newVal) {
      if (newVal.query.keyWord) {
        this.keyword = newVal.query.keyWord;
        this.$emit("set-keyword", this.keyword);
        this.toSearch();
      }
    },
    keyWord(newVal) {
      if (newVal == "") {
        this.keyword = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-control {
  width: 100vw;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
}
</style>