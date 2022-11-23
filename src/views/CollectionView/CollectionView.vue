<template>
  <transition name="collection">
    <div class="collection-top">
      <CollectionTop />
      <CollectionMain />
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import CollectionTop from "./CollectionTop.vue";
import CollectionMain from "./CollectionMain.vue";
export default {
  components: { CollectionTop, CollectionMain },
};
</script>

<style lang="scss" scoped>
.collection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  padding-bottom: 50px;
}
</style>
