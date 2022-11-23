<template>
  <div class="collections">
    <div
      class="collection"
      v-for="(c, i) in userCollectionData"
      :key="i"
      @click="goToRecipesDetail(c.id)"
    >
      <div class="img-con">
        <img :src="c.img" />
      </div>
      <div class="collection-msg">
        <p class="name">{{ c.n }}</p>
        <p class="view">{{ c.recommend_label }}</p>
        <div class="user">
          <img :src="c.a.p" />
          <p class="user-name">{{ c.a.n }}</p>
        </div>
      </div>
    </div>
    <div class="empty" key="empty">
      <van-empty
        v-if="userCollectionData?.length == 0"
        class="custom-image"
        image="/images/empty.jpg"
        description="该用户还没有任何收藏~"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      userCollectionData: [],
    };
  },
  created() {
    this.getUserCollection();
  },
  methods: {
    getUserCollection() {
      this.$axios
        .get(
          `https://apis.netstart.cn/douguo/user/ufavorites/${this.userId}/0/20`
        )
        .then(({ data }) => {
          this.userCollectionData = data.result.recipes;
        });
    },
    goToRecipesDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/home/recipe",
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.collections {
  width: 100vw;
  padding: 10px 20px;

  .collection {
    display: flex;
    font-size: 16px;
    margin-bottom: 10px;

    .img-con {
      position: relative;
      flex: 0 0 35vw;
      width: 35vw;
      height: 30vw;
      overflow: hidden;
      border-radius: 5px;
      margin-right: 10px;

      img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .collection-msg {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-content: center;

      .view {
        font-size: 14px;
      }

      .user {
        display: flex;
        align-items: center;
        color: #999;
        font-size: 14px;

        img {
          display: block;
          width: 25px;
          height: 25px;
          border-radius: 999px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>