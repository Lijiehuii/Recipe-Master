<template>
  <div class="titles">
    <div
      v-for="item in homeListItem"
      :key="item.type"
      @click="setSelectType(item.type)"
    >
      <TitleListItem
        :class="{ active: selectType == item.type, expert: selectType == 1 }"
        :title="item.title"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TitleListItem from "@/components/TitleListItem.vue";
export default {
  data() {
    return {
      homeListItem: [
        {
          title: "厨艺达人",
          type: 1,
        },
        {
          title: "推荐",
          type: 2,
        },
        {
          title: "笔记",
          type: 3,
        },
        {
          title: "视频",
          type: 4,
        },
        {
          title: "活动",
          type: 5,
        },
      ],
    };
  },
  computed: {
    ...mapState(["selectType"]),
  },
  methods: {
    ...mapMutations(["setSelectType"]),
  },
  components: {
    TitleListItem,
  },
};
</script>

<style lang="scss" scoped>
.titles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 40px;
  padding: 0 20px;
  font-size: 12px;
}
</style>