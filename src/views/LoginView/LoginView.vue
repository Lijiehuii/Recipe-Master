<template>
  <div class="login">
    <div class="titles">
      <p class="title">吃货不是在吃</p>
      <p class="title">就是在吃的路上~</p>
    </div>
    <div class="login-wrap">
      <form>
        <label>
          <span class="input-title">手机号: </span
          ><input
            type=""
            v-model.trim.number="form.mobilephone"
            placeholder="请输入手机号码"
          />
        </label>
        <label>
          <span class="input-title">密码: </span
          ><input
            type="password"
            v-model.lazy="form.passwrod"
            placeholder="请输入密码"
            minlength="6"
          />
        </label>
      </form>
    </div>
    <div class="login-btn" @click="toLogin">
      <van-button
        type="primary"
        round
        color="rgb(255, 197, 54)"
        style="height: 30px"
        size="large"
        >登录</van-button
      >
    </div>
    <div class="register-findpwd">
      <span>注册账号</span><span class="line">|</span><span>找回密码</span>
    </div>
    <div class="agree">
      <span class="check-box">
        <van-checkbox
          v-model="checked"
          checked-color="rgb(255, 197, 54)"
          @click="checkedSelect"
          icon-size="16px"
        ></van-checkbox>
      </span>
      <p>
        同意<span class="agreement">《用户协议》</span>和<span class="agreement"
          >《隐私条款》</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        mobilephone: "",
        passwrod: "",
      },
      checked: false,
    };
  },
  methods: {
    checkedSelect() {
      if (this.checked == true) {
        this.checked == false;
      } else if (this.checked == false) {
        this.checked == true;
      }
    },
    toLogin() {
      console.log("this.mobilephone", this.form.mobilephone);
      console.log("this.passwrod", this.form.passwrod);
      if (this.checked) {
        if (
          this.form.mobilephone == 13112234229 &&
          this.form.passwrod == 111111
        ) {
          let user = JSON.stringify(this.form);
          localStorage.setItem("token_user", user);
          Toast("登录成功");
          this.$router.push({ path: "/home" });
        } else {
          Toast("账号或密码错误!");
        }
      } else if (!this.checked) {
        Toast("请先勾选确认《用户协议》和《隐私条款》");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  background-color: #fff;
  padding: 10px 20px;

  .eat {
    position: absolute;
    top: 10vh;
    left: 10vw;
    transform: scale(0.2);
    .pacman:before,
    .pacman:after {
      content: "";
      position: absolute;
      background: rgb(255, 197, 54);
      width: 100px;
      height: 50px;
      /*保持居中位置*/
      left: 50%;
      top: 10%;
      /*保持居中位置*/
      margin-left: -50px;
      margin-top: -50px;
      /*上半圆效果*/
      border-radius: 50px 50px 0 0;
      /*动画*/
      -webkit-animation: up 0.6s infinite;
      /* 0.6s 动画的速度，越大越慢  infinite --- 无限循环 */
      -moz-animation: up 0.6s infinite;
      -o-animation: up 0.6s infinite;
      animation: up 0.6s infinite;
    }

    .pacman:after {
      /*为了使两个半圆咬合时不出现缝隙*/
      margin-top: -1px;
      /*下半圆效果*/
      border-radius: 0 0 50px 50px;
      -webkit-animation: down 0.6s infinite;
      -moz-animation: down 0.6s infinite;
      -o-animation: down 0.6s infinite;
      animation: down 0.6s infinite;
    }

    .dot {
      position: absolute;
      left: 50%;
      top: 10%;
      width: 12px;
      height: 12px;
      margin-top: -5px;
      margin-left: 30px;
      border-radius: 50%;
      background: #000;
      /*层级关系 越大越在上层*/
      z-index: -1;
      /*实际上只有一个圆点，用了box-shadow的阴影属性。*/
      box-shadow: 30px 0 0 #000, 60px 0 0 #000, 90px 0 0 #000, 120px 0 0 #000,
        150px 0 0 #000, 180px 0 0 #000, 210px 0 0 #000, 240px 0 0 #000;
      -webkit-animation: r-to-l 0.6s infinite;
      -moz-animation: r-to-l 0.6s infinite;
      -o-animation: r-to-l 0.6s infinite;
      animation: r-to-l 0.6s infinite;
    }
  }

  .titles {
    margin-top: 30vw;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 1.5px;
    line-height: 40px;
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    label {
      // display: flex;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid #999;
      padding-bottom: 5px;
      .input-title {
        display: block;
        flex: 0 0 70px;
        width: 70px;
        margin-bottom: 10px;
      }
      input {
        width: 100%;
        border: none;
        outline: none;
        &::placeholder {
          font-size: 12px;
        }
      }
    }
  }
  .login-btn {
    width: 100%;
    padding: 10px 20px 0 20px;
  }
  .register-findpwd {
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .line {
      margin: 0 10px;
      vertical-align: top;
    }
  }
  .agree {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    .check-box {
      margin-right: 10px;
    }

    .agreement {
      color: rgb(82, 149, 159);
    }
  }
}

@-webkit-keyframes up {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-30deg);
  }
}

/*咬合张开的角度*/

@-moz-keyframes up {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-30deg);
  }
}

@-o-keyframes up {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-30deg);
  }
}

@keyframes up {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-30deg);
  }
}

/* down */
@-webkit-keyframes down {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(30deg);
  }
}

@-moz-keyframes down {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(30deg);
  }
}

@-o-keyframes down {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(30deg);
  }
}

@keyframes down {
  0%,
  100% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(30deg);
  }
}

/* r-to-l */
@-webkit-keyframes r-to-l {
  100% {
    margin-left: -1px;
  }
}

@-moz-keyframes r-to-l {
  100% {
    margin-left: -1px;
  }
}

@-o-keyframes r-to-l {
  100% {
    margin-left: -1px;
  }
}

@keyframes r-to-l {
  100% {
    margin-left: -1px;
  }
}
</style>
