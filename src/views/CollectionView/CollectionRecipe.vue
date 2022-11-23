<template>
  <div class="collection-recipe">
    <!-- <transition-group name="gun"> -->
    <CollectionRecipe
      v-for="r in collectionRecipeData"
      :key="r.id"
      :recipe="r"
    />
    <!-- </transition-group> -->
    <div class="empty" key="empty">
      <transition name="kong">
        <van-empty
          v-show="collectionRecipeData.length == 0"
          class="custom-image"
          image="/images/empty.jpg"
          description="您的菜谱列表有点空!"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CollectionRecipe from "@/components/CollectionRecipe.vue";
export default {
  components: { CollectionRecipe },
  computed: {
    ...mapState(["collectionRecipeData"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.gun-leave {
  transform: translateX(100vw);
}

.gun-leave-active {
  transition: all 0.5s linear;
}

.gun-leave-to {
  transform: translateX(-100vw);
}

.kong-enter {
  opacity: 0.1;
}

.kong-enter-active {
  transition: all 2s linear;
}

.kong-enter-yo {
  opacity: 1;
}

.collection-recipe {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .empty {
    position: fixed;
    top: 25%;
  }
}
</style>