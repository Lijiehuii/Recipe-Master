<template>
  <div class="mine-top">
    <div class="controller">
      <i class="icon-settings"></i>
      <p>
        <i class="icon icon-bell-o"></i>
        <i class="icon-share" @click="showShare = true"></i>
      </p>
    </div>
    <div class="user-msg">
      <div class="msg-top">
        <img src="/img/user-img.jpg" />
        <div class="msg">
          <p class="user-name">吃吃吃!!</p>
          <p class="user-lvl">LV.1</p>
        </div>
      </div>
      <div class="msg-bot">
        <div class="msg">
          <p class="gener">厨男</p>
          <p class="age">厨龄 0.1岁</p>
          <p class="user-lvl">IP属地 广东省</p>
        </div>
        <p class="sign">吃货不是在吃就是在去吃的路上,没时间写签名</p>
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
import { Toast } from "vant";

export default {
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
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mine-top {
  width: 100vw;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  .controller {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .icon {
      margin-right: 20px;
    }
  }

  .user-msg {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .msg-top {
      display: flex;
      align-items: center;
      img {
        width: 70px;
        margin-right: 10px;
      }

      .msg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .user-name {
          font-size: 14px;
          margin-right: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          margin-bottom: 10px;
        }

        .user-lvl {
          font-size: 12px;
          font-style: italic;
          color: rgb(254, 198, 51);
        }
      }
    }

    .msg-bot {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 10px 0;
      color: #000;
      font-size: 14px;

      .msg {
        width: 65%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
}
</style>