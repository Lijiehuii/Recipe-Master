<template>
  <div class="main-right">
    <van-skeleton title avatar :row="3" :loading="loading">
      <div
        class="class-item"
        v-for="c in classData"
        :key="c.id"
        v-show="selectType == c.id"
      >
        <div class="item-list" v-for="cs in c.cs" :key="cs.id">
          <img
            :src="cs.image_url"
            v-if="cs.image_url"
            @click="getDish(cs.name)"
          />
          <div class="dishes">
            <span
              class="dish"
              v-for="d in cs.cs"
              :key="d.id"
              @click="getDish(d.name)"
              >{{ d.name }}</span
            >
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
export default {
  props: {
    classData: Array,
    selectType: String,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    getDish(d) {
      console.log(d);
      this.$router.push({
        path: "/classification/search",
        query: {
          keyWord: d,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-right {
  width: calc(100vw - 90px);
  height: calc(100vh - 104px);
  padding: 10px 5px;
  overflow: auto;

  .item-list {
    width: 100%;

    img {
      display: block;
      width: 100%;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .dishes {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      .dish {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
    }
  }
}
</style>