<template>
  <transition :name="transition">
    <div class="classification">
      <ClassificationTopComponents />
      <div class="classification-main">
        <MainLeft
          :classData="classData"
          :selectType="selectType"
          @set-select-type="getSelectType"
        />
        <MainRight :classData="classData" :selectType="selectType" />
      </div>
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import ClassificationTopComponents from "./ClassificationTopComponents.vue";
import MainLeft from "./MainLeft.vue";
import MainRight from "./MainRight.vue";

export default {
  components: { ClassificationTopComponents, MainLeft, MainRight },
  data() {
    return {
      transition: "",
      selectType: "1",
      classData: [],
    };
  },
  created() {
    this.getClassificationdata();
  },
  methods: {
    getClassificationdata() {
      this.$axios
        .get(
          // "https://apis.netstart.cn/douguo/recipe/flatcatalogs"
          "./class.json"
        )
        .then(({ data }) => {
          this.classData = data.result.cs;
        });
    },
    getSelectType(type) {
      this.selectType = type;
    },
  },
  watch: {
    $route(to, from) {
      if (to.name == "search" && from.name == "classification") {
        console.log(to, from);
        this.transition = "classification";
      } else {
        this.transition = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.classification {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  padding-bottom: 50px;

  .classification-main {
    display: flex;
    width: 100vw;
  }
}
</style>
