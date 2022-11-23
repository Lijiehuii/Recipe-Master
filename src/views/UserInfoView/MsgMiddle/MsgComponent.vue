<template>
  <div class="msg">
    <p class="msg-desc">
      <span class="sex">{{ userInfoData.gender == 1 ? "厨男" : "厨娘" }}</span>
      <span class="age">厨龄{{ age }}</span>
      <span class="city">{{ userInfoData.location }}</span>
      <span class="ip-address"
        >IP属地{{ userInfoData.ip_address_location }}</span
      >
    </p>
    <p class="sign">
      {{
        userInfoData.introduction
          ? userInfoData.introduction
          : "吃货不是在吃就是在去吃的路上,没时间写签名"
      }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfoData"]),
    age() {
      return this.userInfoData.age?.split(" ")[1];
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 15px;

  .msg-desc {
    width: 100%;
    line-height: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }

  .sign {
    padding: 5px 0;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 20px;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // overflow: hidden;
  }
}
</style>