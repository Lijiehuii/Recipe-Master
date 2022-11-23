<template>
  <div class="activity">
    <div class="activity-top">
      <div class="top-left" @click="goback()">
        <van-icon name="arrow-left" style="font-size: 25px" />
      </div>
      <p>活动详情</p>
      <div class="top-right" @click="showShare = true">
        <van-icon style="font-size: 25px" name="ellipsis" />
      </div>
    </div>
    <div class="activity-main">
      <iframe
        :src="urlAddress"
        width="675px"
        height="100%"
        scrolling="yes"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        allowtransparency="yes"
      >
      </iframe>
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
export default {
  data() {
    return {
      urlAddress: "",
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
  created() {
    this.urlAddress = this.$route.query.url;
  },
  methods: {
    goback() {
      this.urlAddress = "";
      this.$router.go(-1);
    },
  },
  watch: {
    $route(newVal) {
      this.urlAddress = newVal.query.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.activity {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  z-index: 20;

  .activity-top {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }
  .activity-main {
    align-items: center;
    display: block;
    display: flex;
    content: "";
    width: 100vw;
    height: calc(100vh - 50px);

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>