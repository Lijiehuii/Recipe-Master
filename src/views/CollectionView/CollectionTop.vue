<template>
  <div class="collection-top">
    <div class="collection-title">我的收藏夹</div>
    <div class="collection-type">
      <p
        v-for="item in collectionType"
        class="type"
        :class="{ active: selectCollectionType == item.type }"
        :key="item.type"
        @click="setSelectCollectionType(item.type)"
      >
        {{ item.title }}
      </p>
    </div>
    <div class="delete-con">
      <div
        class="delete"
        v-if="collectionRecipeData.length > 1 && selectCollectionType == 1"
        @click="cleanAll"
        key="1"
      >
        点击清空我的菜谱列表
        <van-icon name="delete-o" />
      </div>
      <div
        class="delete"
        v-if="followUsersData.length > 1 && selectCollectionType == 2"
        @click="cleanAll"
        key="2"
      >
        点击清空我的关注列表
        <van-icon name="delete-o" />
      </div>
    </div>
    <van-dialog
      :message="
        selectCollectionType == 1
          ? '确定要清空我的菜谱列表吗?'
          : '确定要清空我的关注列表吗'
      "
      v-model="ticpShow"
      show-cancel-button
      @confirm="claan"
    >
    </van-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      collectionType: [
        {
          title: "菜谱",
          type: 1,
        },
        {
          title: "关注",
          type: 2,
        },
      ],
      ticpShow: false,
    };
  },
  computed: {
    ...mapState([
      "selectCollectionType",
      "collectionRecipeData",
      "followUsersData",
    ]),
  },
  methods: {
    ...mapMutations([
      "setSelectCollectionType",
      "resetFollowUsersData",
      "filterFollow",
      "resetCollectionRecipeData",
    ]),
    cleanAll() {
      console.log(123);
      this.ticpShow = true;
    },
    cleanAllRecipe() {},
    claan() {
      if (this.selectCollectionType == 2) {
        this.resetFollowUsersData();
        this.filterFollow();
      } else if (this.selectCollectionType == 1) {
        this.resetCollectionRecipeData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .delete-leave,
// .delete-enter-to {
//   opacity: 1;
//   top: 0;
// }

// .delete-leave-active,
// .delete-enter-active {
//   transition: all 1s linear;
// }

// .delete-leave-to,
// .delete-enter {
//   opacity: 0;
//   top: -20px;
// }

.collection-top {
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  background-color: #fff;

  .collection-title {
    width: 100%;
    padding: 10px 20px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1.5px;
    border-bottom: 1px solid #ddd;
  }

  .collection-type {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 40px;
    padding: 0 20px;
    margin-top: 5px;
    .type {
      width: calc((100vw - 40px) / 2);
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .active {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.3s linear;

      &::after {
        display: block;
        margin-top: 5px;
        width: 20px;
        height: 3px;
        border-radius: 999px;
        background-color: rgb(252, 201, 48);
        content: "";
      }
    }
  }
  .delete-con {
    position: relative;
    width: 100vw;
    background-color: #fff;
    .delete {
      position: absolute;
      height: 20px;
      z-index: 999;
      width: 100vw;
      background-color: #fff;
      text-align: center;
      line-height: 20px;
    }
  }
}
</style>