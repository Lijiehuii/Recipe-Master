<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar
      route
      active-color="rgb(255, 61, 61)"
      inactive-color="#333"
      z-index="1"
    >
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/classification" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/collection" icon="star-o">收藏夹</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["selectType", "collectionRecipeData", "followUsersData"]),
  },
  methods: {
    ...mapMutations([
      "setSelectType",
      "setLocalCollectionRecipeData",
      "setFollowUserData",
    ]),
  },
  created() {
    // Home选择的类型本地数据持久化
    if (!localStorage.selectHometype) {
      let selectHometype = JSON.stringify(this.selectType);
      localStorage.setItem("selectHometype", selectHometype);
    }
    let getSelectHomeType = JSON.parse(localStorage.selectHometype);
    getSelectHomeType = parseInt(getSelectHomeType);
    this.setSelectType(getSelectHomeType);

    // 关注的user本地数据持久化
    if (!localStorage.followUsersData) {
      let followUsersData = JSON.stringify(this.followUsersData);
      localStorage.setItem("followUsersData", followUsersData);
    }
    let getFollowUsersData = JSON.parse(localStorage.followUsersData);
    this.setFollowUserData(getFollowUsersData);

    // 收藏的菜谱本地数据持久化
    if (!localStorage.collectionRecipeData) {
      let collectionRecipeData = JSON.stringify(this.collectionRecipeData);
      localStorage.setItem("collectionRecipeData", collectionRecipeData);
    }
    let getCollectionRecipeData = JSON.parse(localStorage.collectionRecipeData);
    this.setLocalCollectionRecipeData(getCollectionRecipeData);
  },
  watch: {
    selectType(newVal) {
      let newSelectHomeType = JSON.stringify(newVal);
      localStorage.setItem("selectHometype", newSelectHomeType);
    },
    followUsersData(newVal) {
      let newFollowUserData = JSON.stringify(newVal);
      localStorage.setItem("followUsersData", newFollowUserData);
    },
    collectionRecipeData(newVal) {
      let newCollectionRecipeData = JSON.stringify(newVal);
      localStorage.setItem("collectionRecipeData", newCollectionRecipeData);
    },
  },
};
</script>

<style>
/* .home-leave,
.classification-leave,
.collection-leave,
.mine-leave {
  opacity: 1;
}

.home-leave-active,
.classification-leave-active,
.collection-leave-active,
.mine-leave-active {
  transition: all 0.3s linear;
}

.home-leave-to,
.classification-leave-to,
.collection-leave-to,
.mine-leave-to {
  opacity: 0;
} */

.home-leave,
.classification-leave {
  opacity: 1;
}
.home-leave-active,
.classification-leave-active {
  transition: all 0.3s linear;
}
.home-leave-to,
.classification-leave-to {
  opacity: 0;
}

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
