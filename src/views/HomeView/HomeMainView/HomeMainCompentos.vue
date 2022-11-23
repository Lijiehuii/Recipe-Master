<template>
  <div class="home-main" v-touch:swipe="swipeHandler">
    <div class="main-wrappper">
      <transition-group :name="slideDirection">
        <CulinaryExpertView key="CulinaryExpert" v-if="selectType == 1" />
        <RecommendView key="Recommend" v-if="selectType == 2" />
        <NotesView key="Notes" v-if="selectType == 3" />
        <VideosView key="Videos" v-if="selectType == 4" />
        <ActivityView key="Activity" v-if="selectType == 5" />
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import CulinaryExpertView from "./CulinaryExpertView/CulinaryExpertView.vue";
import RecommendView from "./RecommendView/RecommendView.vue";
import NotesView from "./NotesView/NotesView.vue";
import VideosView from "./VideosView/VideosView.vue";
import ActivityView from "./ActivityView/ActivityView.vue";
export default {
  components: {
    CulinaryExpertView,
    RecommendView,
    NotesView,
    VideosView,
    ActivityView,
  },
  data() {
    return {
      slideDirection: "left",
    };
  },
  computed: {
    ...mapState(["selectType"]),
  },
  methods: {
    ...mapMutations([
      "setSelectType",
      "selectTypeValueAdd",
      "selectTypeValueReduce",
    ]),
    swipeHandler(direction) {
      if (direction == "left" && this.selectType <= 4) {
        console.log("left");
        this.selectTypeValueAdd();
        this.slideDirection = "left";
      } else if (direction == "right" && this.selectType >= 2) {
        console.log("right");
        this.selectTypeValueReduce();
        this.slideDirection = "right";
      }
    },
  },
  watch: {
    selectType(newVal, oldVal) {
      console.log("newVal=>", newVal, " oldVal=>", oldVal);
      if (newVal > oldVal) {
        this.slideDirection = "left";
      } else if (newVal < oldVal) {
        this.slideDirection = "right";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.left-enter {
  transform: translateX(100vw);
}
.left-enter-active,
.left-leave-active {
  transition: all 0.3s linear;
}
.left-enter-to,
.left-leave {
  transform: translateX(0);
}

.left-leave-to {
  transform: translateX(-100vw);
}

.right-enter {
  transform: translateX(-100vw);
}
.right-enter-active,
.right-leave-active {
  transition: all 0.3s linear;
}
.right-enter-to,
.right-leave {
  transform: translateX(0);
}

.right-leave-to {
  transform: translateX(100vw);
}

.home-main {
  // position: absolute;
  // top: 94px;
  width: 100vw;
}
</style>