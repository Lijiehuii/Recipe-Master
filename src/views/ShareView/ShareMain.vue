<template>
  <div class="mian">
    <div class="middle">
      <van-icon name="smile-o" size="30px" color="rgb(253, 225, 56)" />
      每一顿饭都值得分享
    </div>
    <div class="bottom">
      <div class="bottom-item">
        <p class="title">发布菜谱</p>
        <p class="empty"></p>
        <p class="empty1"></p>
        <p class="main">可发10分钟视频<span>快来试试</span></p>
        <p class="empty2"></p>
        <p class="empty"></p>
      </div>
      <div class="bottom-item">
        <p class="title">发布笔记</p>
        <p class="empty">每一篇笔记都是一份</p>
        <p class="main"><van-icon size="30px" name="video-o" /></p>
        <p class="empty">美好回忆</p>
        <p class="empty">我们将您的笔记</p>
        <p class="empty">收录在您的美食日记</p>
      </div>
    </div>
    <p class="draft">草稿箱</p>
  </div>
</template>

<style lang="scss" scoped>
.mian {
  .middle {
    width: 100vw;
    height: 60px;
    margin-top: 100px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .bottom {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;

    .bottom-item {
      display: flex;
      width: calc((100vw - 60px) / 2);
      flex-direction: column;
      justify-content: center;
      text-align: center;
      color: rgb(72, 124, 64);
      padding: 15px 10px 10px 10px;
      background-color: rgb(183, 206, 180);
      border-radius: 10px;
      &:nth-child(2) {
        color: rgb(198, 162, 57);
        background-color: rgb(253, 226, 149);
        .title {
          background-color: rgb(253, 226, 149);
        }

        p {
          background-color: rgb(255, 245, 218);
        }
      }
      p {
        margin-bottom: 10px;
        padding: 2px 3px;
        height: 20px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title {
        width: 100%;
        height: 20px;
        font-size: 16px;
      }
      .empty {
        content: "";
        width: 100%;
        background-color: rgb(218, 230, 220);
      }
      .main {
        width: 100%;
        padding: 20px;
        background-color: rgb(218, 230, 220);
        display: flex;
        flex-direction: column;
      }
      .empty1 {
        content: "";
        width: 55%;
        background-color: rgb(218, 230, 220);
      }
      .empty2 {
        content: "";
        width: 75%;
        background-color: rgb(218, 230, 220);
      }
    }
  }
  .draft {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 30px;
    margin-top: 30px;
  }
}
</style>