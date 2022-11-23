<template>
  <transition :name="transition">
    <div class="search">
      <SearchTop
        :keyWord="keyWord"
        @get-history-data="getHistoryData"
        @get-search-data="getSearchData"
        @set-keyword="entering"
        @reset-search-data="resetSearchData"
        @reset-keyWord="resetKeyWord"
        @is-Searching="Searching"
        @search-complete="Searching"
      />
      <SearchTicps
        :historySearchData="historySearchData"
        @get-history-data="getHistoryData"
        @set-keyword="setKeyword"
        @reset-history-data="resetHistoryData"
        v-show="!keyWord"
      />
      <SearchRender
        :searchData="searchData"
        v-show="keyWord"
        @set-collection="setCollection"
        :LoadingShow="LoadingShow"
        :keyWord="keyWord"
      />
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import SearchTop from "./SearchTop.vue";
import SearchTicps from "./SearchTicps.vue";
import SearchRender from "./SearchRender.vue";
export default {
  data() {
    return {
      historySearchData: [],
      searchData: [],
      keyWord: "",
      LoadingShow: false,
      transition: "",
    };
  },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {
    entering(kw) {
      this.keyWord = kw;
    },
    setSearchData(data) {
      this.searchData = data;
      console.log(this.searchData);
    },
    getHistoryData(data) {
      this.historySearchData = this.historySearchData.filter((h) => {
        return h != data;
      });
      this.historySearchData = [data, ...this.historySearchData];
    },
    setKeyword(kw) {
      this.keyWord = kw;
    },
    resetHistoryData() {
      this.historySearchData = [];
    },
    getSearchData(data) {
      this.searchData = data;
    },
    resetSearchData() {
      this.searchData = [];
    },
    resetKeyWord() {
      this.keyWord = "";
    },
    setCollection(id) {
      console.log("view=>", id);
      this.searchData = this.searchData.map((s) => {
        console.log(s);
        if (id == s.r.id) {
          return {
            ...s,
            collection: !s.collection,
          };
        } else {
          return s;
        }
      });
      console.log("this.searchData", this.searchData);
    },
    Searching() {
      this.LoadingShow = !this.LoadingShow;
    },
  },
  watch: {
    keyWord(newVal) {
      if (newVal == "") {
        this.searchData = [];
      }
    },
    $route(from) {
      if (from.name == "home" || from.name == "classification") {
        this.transition = "search";
      } else {
        this.transition = "";
      }
    },
  },
  components: { SearchTop, SearchTicps, SearchRender },
};
</script>

<style lang="scss" scoped>
.search-enter,
.search-leave-to {
  opacity: 0.5;
  transform: translateY(100vh);
}

.search-enter-active,
.search-leave-active {
  transition: all 0.3s linear;
}

.search-leave,
.search-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.search {
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
  font-size: 18px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: block;
  }
}
</style>