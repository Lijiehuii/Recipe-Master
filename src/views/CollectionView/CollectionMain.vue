<template>
  <div class="collection-main">
    <CollectionRecipe v-show="selectCollectionType == 1" />
    <FollowUsers v-show="selectCollectionType == 2" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FollowUsers from "./FollowUsers.vue";
import CollectionRecipe from "./CollectionRecipe.vue";

export default {
  computed: {
    ...mapState(["selectCollectionType"]),
  },
  components: { FollowUsers, CollectionRecipe },
};
</script>

<style lang="scss" scoped>
.collection-main {
  padding-top: 20px;
  padding-bottom: 50px;
}
</style>
