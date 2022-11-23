<template>
  <transition :name="transition">
    <div class="home">
      <HomeTop />
      <HomeMainCompentos />
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import HomeTop from "./HomeTop.vue";
import HomeMainCompentos from "./HomeMainView/HomeMainCompentos.vue";

export default {
  components: { HomeTop, HomeMainCompentos },
  data() {
    return {
      transition: "",
    };
  },
  created() {
    // console.log(([] + [][[]])[+!![]] + ([] + {})[+!![] + !![]]);
    this.getData();
  },
  methods: {
    getData() {
      console.log("这里是Home");
    },
  },
  watch: {
    $route(to, from) {
      if (to.name == "search" && from.name == "home") {
        this.transition = "home";
      } else {
        this.transition = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
}
</style>
