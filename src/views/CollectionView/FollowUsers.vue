<template>
  <div class="my-follow">
    <!-- <transition-group name="gun"> -->
      <UserCard v-for="f in followUsersData" :key="f.id" :expert="f" />
    <!-- </transition-group> -->
    <div class="empty" key="empty">
      <transition name="kong">
        <van-empty
          v-show="followUsersData.length == 0"
          class="custom-image"
          image="/images/empty.jpg"
          description="四处逛逛，结识有趣的吃货"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserCard from "@/components/UserCard.vue";
export default {
  components: {
    UserCard,
  },
  computed: {
    ...mapState(["followUsersData"]),
  },
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

.my-follow {
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
