<template>
  <transition name="usermsgshow">
    <div class="userinfo" @scroll.passive="pageScroll($event)">
      <UserInfoTop :scrollTopGet="scrollTopGet" />
      <UserInfoMesg v-if="userInfoData.length != 0" />
      <van-loading
        style="margin-top: 10px"
        size="24px"
        v-if="userInfoData.length == 0"
        vertical
        >数据加载中，请耐心等候...</van-loading
      >
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import UserInfoTop from "@/components/UserInfoTop.vue";
import UserInfoMesg from "./UserInfoMesg.vue";
export default {
  components: { UserInfoTop, UserInfoMesg },
  data() {
    return {
      otherUserId: "",
      scrollTopGet: 0,
    };
  },
  created() {
    this.otherUserId = this.$route.query.id;
    this.getUserInfo(this.otherUserId);
  },
  computed: {
    ...mapState(["followUsersData", "userInfoData"]),
  },
  watch: {
    $route(newVal) {
      if (newVal.name == "userinfo") {
        this.setUserInfoData();
        let newId = newVal.query.id;
        this.getUserInfo(newId);
      }
    },
  },
  methods: {
    ...mapMutations(["setUserInfoData"]),
    getUserInfo(id) {
      this.$axios
        .get(`https://apis.netstart.cn/douguo/user/info/${id}`)
        .then(({ data }) => {
          if (data.state) {
            let getUserInfoData = { ...data.result.user, follow: false };
            for (let i = 0; i < this.followUsersData.length; i++) {
              if (getUserInfoData.user_id == this.followUsersData[i].id) {
                getUserInfoData.follow = true;
              }
            }
            this.setUserInfoData(getUserInfoData);
          }
        });
    },
    pageScroll(e) {
      this.scrollTopGet = e.target.scrollTop;
    },
  },
};
</script>

<style lang="scss" scoped>
.usermsgshow-enter,
.usermsgshow-leave-to {
  opacity: 0;
  transform: translateX(100vw);
}
.usermsgshow-enter-active,
.usermsgshow-leave-active {
  transition: all 0.3s linear;
}
.usermsgshow-enter-to,
.usermsgshow-leave {
  opacity: 1;
  transform: translateX(0);
}

.userinfo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
  z-index: 20;
}
</style>