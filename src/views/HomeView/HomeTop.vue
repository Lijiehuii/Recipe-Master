<template>
  <div class="home-top">
    <TopController />
    <HomeTypeTitle />
  </div>
</template>

<script>
import TopController from "./TopController.vue";
import HomeTypeTitle from "./HomeTypeTitle.vue";
export default {
  components: { TopController, HomeTypeTitle },
  methods: {
    homeSearch() {
      this.$router.push({ path: `/home/search` });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-top {
  width: 100vw;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #fff;
}
</style>