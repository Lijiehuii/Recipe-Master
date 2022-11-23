<template>
  <div class="top-con" v-if="noteData">
    <div class="top">
      <div class="top-left">
        <van-icon name="arrow-left" style="font-size: 25px" @click="goback()" />
        <img :src="author?.p" v-if="noteData" />
        <p v-if="author">
          <span class="user-name">{{ author?.n }}</span
          ><span class="user-lvl">LV.{{ author?.lvl }}</span>
        </p>
      </div>
      <div class="top-right">
        <div
          class="follow-expert"
          :class="{ follow: followUserData?.follow }"
          @click.stop="followWith(followUserData)"
          v-if="noteData"
        >
          <div v-if="!followUserData?.follow">关注</div>
          <div
            :class="{ follow: followUserData?.follow }"
            v-if="followUserData?.follow"
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
    author: [Object, String],
    followUserData: Object,
    noteData: [Object, String],
  },
  data() {
    return {
      id: "",
      showShare: false,
      loading: true,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  mounted() {
    this.loading = false;
  },
  computed: {
    ...mapState(["followUsersData"]),
  },
  methods: {
    ...mapMutations([
      "getUserInfoFollow",
      "setUserInfoFollow",
      "removeUnfollowExpertData",
      "setExpertsFolloeData",
    ]),
    goback() {
      this.$emit("reset-userdata");
      this.$router.go(-1);
    },

    followWith(user) {
      console.log(user);
      if (user.userid) {
        if (!user.follow) {
          Toast("已关注 " + user.nick);
          this.getUserInfoFollow(user);
          this.setUserInfoFollow();
          console.log("note增加一位关注", this.followUsersData);
          this.$emit("set-user-follow");
        } else if (user.follow) {
          Toast("已取消关注 " + user.nick);
          let item = { id: user.user_id };
          this.removeUnfollowExpertData(item);
          this.setUserInfoFollow();
          console.log("note取消一位关注", this.followUsersData);
          this.$emit("set-user-follow");
        }
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
      margin-right: 10px;
    }

    .user-lvl {
      font-size: 12px;
      font-style: italic;
      color: rgb(254, 198, 51);
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

