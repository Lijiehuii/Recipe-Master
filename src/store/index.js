import Vue from 'vue'
import Vuex from 'vuex'
// import  getTime  from "@/utils";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectType: 2,
    expertsData: [],
    expertOffset: 0,
    followUsersData: [],
    userInfoData: [],
    recommendDataList: [],
    collectionRecipeData: [],
    selectCollectionType: 1,
  },
  getters: {
    followCount(state) {
      return state.followUsersData.length
    },
    recipeCount(state) {
      return state.collectionRecipeData.length
    },
  },
  mutations: {
    // 设置首页做选择的类型
    setSelectType(state, selectType) {
      state.selectType = selectType
    },
    // 首页屏幕右滑类型改变
    selectTypeValueAdd(state) {
      state.selectType++
    },
    selectTypeValueReduce(state) {
      state.selectType--
    },
    // 清空首页厨艺达人数据
    clearnExpertsData(state) {
      state.expertsData = []
    },
    // 设置首页关注的数据
    setExpertsData(state, expertsData) {
      state.expertsData = expertsData
    },
    // 设置页面刷新时的 offset
    setExpertsOffset(state, offset) {
      state.expertOffset += offset
    },
    // 重置获取数据的
    resetExpertOffset(state) {
      state.expertOffset = 0
    },
    // 设置关注的人
    followExpert(state, id) {
      state.expertsData = state.expertsData.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            follow: item.follow == false ? true : false
          }
        }
        return item;
      })
    },
    // 将关注的人添加到数组中
    getFollowExpertsData(state, item) {
      state.followUsersData = [{
        ...item,
        follow: true
      }, ...state.followUsersData]
      // 去除重复的关注
      for (let i = 0; i < state.followUsersData.length; i++) {
        for (let j = i + 1; j < state.followUsersData.length; j++) {
          if (state.followUsersData[i].id == state.followUsersData[j].id) {
            let del = j;
            state.followUsersData.splice(del, 1);
          }
        }
      }
    },
    // 在用户主页关注或者取消关注用户
    getUserInfoFollow(state, user) {
      state.followUsersData = [{
        p: user?.user_photo,
        id: user?.userid,
        lvl: user?.lvl,
        n: user?.nick,
        followers_count_text: user?.followers_count_text,
        recipes_count_text: user?.recipes_count + " 菜谱",
        follow: !user.follow
      }, ...state.followUsersData]
    },
    // 在用户主页修改用户关注信息
    setUserInfoFollow(state) {
      state.userInfoData = { ...state.userInfoData, follow: !state.userInfoData.follow }

      state.expertsData = state.expertsData.map((e) => {
        if (e.id == state.userInfoData.userid) {
          return {
            ...e,
            follow: !e.follow
          }
        }
        return e
      })
    },
    // 清空关注列表
    resetFollowUsersData(state) {
      state.followUsersData = []
    },
    // 去掉expertsData中follow的人
    filterFollow(state) {
      state.expertsData = state.expertsData.filter((e) => {
        return !e.follow
      })
    },
    // 去除不关注的人
    removeUnfollowExpertData(state, item) {
      state.followUsersData = state.followUsersData.filter(u => {
        return u.id != item.id
      })
    },
    // 设置用户信息
    setUserInfoData(state, data) {
      state.userInfoData = data ? data : []
    },
    // 设置选择收藏夹的类型
    setSelectCollectionType(state, type) {
      state.selectCollectionType = type
    },
    setRecommendDataList(state, data) {
      state.recommendDataList = data
    },
    // 设置收藏菜谱的数据
    setCollectionRecipeData(state, data) {
      state.collectionRecipeData = [data, ...state.collectionRecipeData]
    },
    // 去掉不收藏的菜谱数据
    filterUncollectionRecipeData(state, id) {
      state.collectionRecipeData = state.collectionRecipeData.filter((c => {
        return c.id != id
      }))

    },
    // 清空收藏的菜谱列表
    resetCollectionRecipeData(state) {
      state.collectionRecipeData = []
    },
    setFollowUserData(state, data) {
      state.followUsersData = data
    },
    setLocalCollectionRecipeData(state, data) {
      state.collectionRecipeData = data
    }
  },
  actions: {

  },
  modules: {
  }
})
