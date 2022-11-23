<template>
  <div class="top-con">
    <div class="top">
      <div class="top-left">
        <van-icon name="arrow-left" style="font-size: 25px" @click="goback()" />
        <img
          v-if="scrollTopGet >= 75 && userInfoData"
          v-lazy="userInfoData.user_photo"
        />
        <span class="user-name" v-if="scrollTopGet >= 75 && userInfoData">{{
          userInfoData.nick
        }}</span>
      </div>
      <div class="top-right">
        <div
          class="follow-expert"
          :class="{ follow: userInfoData.follow }"
          v-if="scrollTopGet >= 75 && userInfoData"
          @click.stop="followWith(userInfoData)"
        >
          <div v-if="!userInfoData.follow">关注</div>
          <div
            :class="{ follow: userInfoData.follow }"
            v-if="userInfoData.follow"
          >
            已关注
          </div>
        </div>
        <span @click="showShare = true">
          <van-icon style="font-size: 25px" name="ellipsis" />
        </span>
      </div>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  props: {
    scrollTopGet: Number,
  },
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  computed: {
    ...mapState(["expertsData", "userInfoData"]),
  },

  methods: {
    ...mapMutations([
      "getUserInfoFollow",
      "setUserInfoFollow",
      "removeUnfollowExpertData",
      "setExpertsFolloeData",
    ]),
    goback() {
      let route = this.$route.params.route;
      this.$router.push({ path: `/${route}` });
    },
    followWith(user) {
      console.log(123);
      console.log(user);
      console.log(user.follow);
      if (!user.follow) {
        this.getUserInfoFollow(user);
        this.setUserInfoFollow();
      } else if (user.follow) {
        let item = { id: user.user_id };
        this.removeUnfollowExpertData(item);
        this.setUserInfoFollow();
      }
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.top-con {
  width: 100vw;
  height: 50px;
  padding: 0 10px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 10;

  .top {
    display: flex;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
  }

  .top-left {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      margin: 0 10px 0 20px;
    }

    .user-name {
      font-weight: 500;
      font-size: 15px;
    }
  }

  .top-right {
    display: flex;
    justify-content: center;
    align-items: center;
    .follow-expert {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 20px;
      font-size: 12px;
      font-weight: bold;
      background-color: rgb(254, 198, 51);
      border-radius: 999px;
      margin-right: 10px;

      &.follow {
        background-color: rgb(246, 246, 246);
      }
    }
  }
}
</style>

