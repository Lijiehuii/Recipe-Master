<template>
  <div class="meg-top">
    <img v-lazy="userInfoData.user_photo" />
    <div class="user">
      <div class="top">
        <p class="user-name">{{ userInfoData.nick }}</p>
        <p class="user-level">LV.{{ userInfoData.lvl }}</p>
      </div>
      <div
        class="follow-expert"
        :class="{ follow: userInfoData.follow }"
        @click="followWith(userInfoData)"
      >
        <div v-if="!userInfoData.follow">关注</div>
        <div
          :class="{ follow: userInfoData.follow }"
          v-if="userInfoData.follow"
        >
          已关注
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["userInfoData"]),
  },
  methods: {
    ...mapMutations([
      "getUserInfoFollow",
      "setUserInfoFollow",
      "removeUnfollowExpertData",
      "setExpertsFolloeData",
    ]),
    followWith(user) {
      if (!user.follow) {
        this.getUserInfoFollow(user);
        this.setUserInfoFollow();
        console.log(user.follow);
      } else if (user.follow) {
        let item = { id: user.user_id };
        this.removeUnfollowExpertData(item);
        this.setUserInfoFollow();
        console.log(user.follow);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.meg-top {
  width: 100vw;
  padding: 10px 20px;
  display: flex;

  img {
    display: block;
    width: 55px;
    height: 55px;
    border-radius: 999px;
    margin-right: 10px;
  }
  .user {
    display: flex;
    padding-top: 10px;
    flex-direction: column;
    justify-content: space-between;

    .top {
      display: flex;
      align-items: center;
      font-size: 15px;
      letter-spacing: 1px;

      .user-name {
        font-size: 14px;
        margin-right: 10px;
        font-weight: 600;
        letter-spacing: 1.5px;
      }

      .user-level {
        font-size: 12px;
        font-style: italic;
        font-weight: 500;
        color: rgb(254, 198, 51);
      }
    }

    .follow-expert {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 175px;
      height: 25px;
      font-size: 12px;
      font-weight: bold;
      background-color: rgb(254, 198, 51);
      border-radius: 999px;

      &.follow {
        background-color: rgb(246, 246, 246);
      }
    }
  }
}
</style>