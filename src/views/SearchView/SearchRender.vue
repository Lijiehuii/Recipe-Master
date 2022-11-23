<template>
  <div class="search-list">
    <div
      v-for="(l, i) in searchData"
      :key="i"
      @click="getRecipeDetil(l.r?.id)"
      v-show="searchData !== {}"
    >
      <SearchListCard :list="l" @set-collection="setCollection" />
    </div>
    <van-loading
      style="margin-top: 10px"
      size="24px"
      v-if="LoadingShow"
      vertical
      >数据加载中，请耐心等候...
    </van-loading>
  </div>
</template>

<script>
import SearchListCard from "@/components/SearchListCard.vue";
export default {
  components: { SearchListCard },
  props: {
    searchData: Array,
    keyWord: String,
    LoadingShow: Boolean,
  },
  created() {
    console.log(this.searchData);
  },
  methods: {
    getRecipeDetil(id) {
      this.$router.push({
        path: "/search/recipe",
        query: {
          id,
        },
      });
    },
    setCollection(id) {
      this.$emit("set-collection", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-list {
  width: 100vw;
  padding: 10px 20px;

  .searching {
    font-size: 14px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>