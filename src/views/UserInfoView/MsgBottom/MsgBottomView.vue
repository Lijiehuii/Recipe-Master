<template>
  <div class="msg-bottom">
    <div class="titles">
      <div
        v-for="t in userInfoShowType"
        :key="t.type"
        @click="setShowType(t.type)"
      >
        <TitleListItem
          :class="{ active: showType == t.type }"
          :title="t.title"
          :count="t.count"
        />
      </div>
    </div>
    <div class="msg-show">
      <UserRecipes v-show="showType == 1" :userId="userId" />
      <UserNotes v-show="showType == 2" :userId="userId" />
      <UserCollection v-show="showType == 3" :userId="userId" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TitleListItem from "@/components/TitleListItem.vue";
import UserRecipes from "./UserRecipes.vue";
import UserNotes from "./UserNotes.vue";
import UserCollection from "./UserCollection.vue";

export default {
  components: { TitleListItem, UserRecipes, UserNotes, UserCollection },
  data() {
    return {
      showType: 1,
      userInfoShowType: [],
      userId: "",
    };
  },
  created() {
    this.userInfoShowType = [
      {
        title: "菜谱",
        type: 1,
        count: this.userInfoData?.recipes_count
          ? this.userInfoData?.recipes_count
          : 0,
      },
      {
        title: "笔记",
        type: 2,
        count: this.userInfoData?.notes_count
          ? this.userInfoData?.notes_count
          : 0,
      },
      {
        title: "收藏",
        type: 3,
        count: this.userInfoData?.collect_count
          ? this.userInfoData?.collect_count
          : 0,
      },
    ];
    this.userId = this.userInfoData.userid;
  },
  computed: {
    ...mapState(["userInfoData"]),
  },
  methods: {
    setShowType(type) {
      this.showType = type;
    },
  },
};
</script>

<style lang="scss" scoped>
.titles {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 40px;
  padding: 0 20px;
  font-size: 12px;
}
</style>