<template>
  <div class="list">
    <div>
      <img class="food-img" :src="list.r.img" />
      <div class="list-desc">
        <p class="name">{{ list.r.n }}</p>
        <p class="score" v-if="list.r.rate > 0">
          {{ list.r.rate == 5 ? list.r.rate + ".0" : list.r.rate }}分
        </p>
        <div class="author">
          <img :src="list.r.a.p" />
          <p class="author-name">{{ list.r.a.n }}</p>
        </div>
      </div>
    </div>
    <div class="bottom-right collection" @click.stop="collection(list.r.id)">
      <transition-group name="collection">
        <div class="star" key="star - o">
          <van-icon
            size="20px"
            v-if="!list.collection"
            color="#000"
            name="star-o"
          />
        </div>
        <div class="star" key="star">
          <van-icon
            size="20px"
            v-if="list.collection"
            color="rgb(254, 198, 51)"
            name="star"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    list: Object,
  },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {
    ...mapMutations([
      "setCollectionRecipeData",
      "filterUncollectionRecipeData",
    ]),
    collection(id) {
      console.log("item=>", id);
      if (this.list.collection) {
        Toast("已取消收藏菜谱 " + this.list.r?.n);
        this.filterUncollectionRecipeData(this.list.r.id);
      } else if (!this.list.collection) {
        let collectionRecipe = {
          id: this.list.r.id,
          img: this.list.r.img,
          stdname: this.list.r.n,
          collection: true,
          a: {
            id: this.list.r.a.id,
            n: this.list.r.a.n,
            p: this.list.r.a.p,
          },
        };
        this.setCollectionRecipeData(collectionRecipe);
        Toast("已收藏菜谱 " + this.list.r?.n);
      }
      this.$emit("set-collection", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 10px 0;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  div {
    display: flex;

    .food-img {
      display: block;
      flex: 0 0 35vw;
      width: 35vw;
      height: 25vw;
      margin-right: 10px;
      border-radius: 10px;
    }

    .list-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name {
        font-size: 13px;
        line-height: 20px;
      }

      .author {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          margin-right: 10px;
        }
      }
    }
  }

  .bottom-right {
    position: relative;
    align-self: flex-end;

    .star {
      position: absolute;
      top: -20px;
      right: 0px;
    }
  }
}
</style>