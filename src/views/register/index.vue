<template>
  <div class="login-page">
    <!-- <van-nav-bar title="登录" left-arrow @click-left="$router.back()" /> -->
    <van-image class="logo" round width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    <!-- 表单 -->
    <van-form validate-first @failed="onFailed">
      <van-field
        clearable
        class="form-item"
        left-icon="manager-o"
        placeholder="用户名(手机号)"
        autocomplete="off"
        name="phone"
        v-model="user.phone"
        :rules="formRules.phone"
      />
      <van-field
        class="form-item"
        name="password"
        left-icon="lock"
        placeholder="密码"
        v-model="user.password"
        :type="showPasswordIcon1 ? 'text' : 'password'"
        :rules="formRules.password"
      >
        <van-icon
          slot="right-icon"
          :name="showPasswordIcon1 ? 'eye-o' : 'closed-eye'"
          @click="showPassword(1)"
        />
      </van-field>
      <van-field
        class="form-item"
        name="confirmPassword"
        left-icon="lock"
        placeholder="确认密码"
        v-model="user.confirmPassword"
        :type="showPasswordIcon2 ? 'text' : 'password'"
        :rules="formRules.confirmPassword"
      >
        <van-icon
          slot="right-icon"
          :name="showPasswordIcon2 ? 'eye-o' : 'closed-eye'"
          @click="showPassword(2)"
        />
      </van-field>
      <van-field
        class="form-item"
        name="validCode"
        left-icon="comment"
        placeholder="验证码"
        autocomplete="off"
        v-model="user.validCode"
        :rules="formRules.validCode"
      >
        <span slot="right-icon">
          <van-count-down
            class="countDown"
            @finish="isCount = false"
            v-if="isCount"
            format="ss秒后可发送"
            :time="1000 * 100"
          />
          <span v-if="!isCount" @click.prevent="onSendsms">取验证码</span>
        </span>
      </van-field>
      <!-- <van-field
        class="form-item form-item-img"
        name="validCode"
        left-icon="comment"
        placeholder="图形验证码"
        right-icon='eye-o'
        v-model="user.validCode"
        :rules="formRules.validCode"
      >
        <span slot="right-icon">
          <van-image width="100" height="20" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </span>
      </van-field> -->
      <van-field
        class="form-item"
        name="validCode"
        v-model="user.recommendUid"
      >
        <span slot="left-icon" style="color: #eaeff3">推荐码</span>
      </van-field>
    </van-form>
    <div class="login-btn-container">
      <van-button
        block
        class="login-btn"
        color="#01d561"
        type="primary"
        @click="loginMethod"
      >登录</van-button>
    </div>
    <div class="download">我已经注册，立即下载APP</div>
  </div>
</template>

<script>
import { regist, sendCode } from '@/request/api'
import { Toast } from 'vant';
export default {
  name: "register",
  data() {
    return {
      user: {
        phone: "",
        validCode: "",
        password: '',
        confirmPassword: '',
        recommendUid: '371127943'
      },
      // 验证规则
      formRules: {
        phone: [
          {
            required: true,
            message: "请输入手机号！",
            trigger: "onBlur",
          },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号！",
            trigger: "onBlur",
          },
        ],
        validCode: [
          {
            required: true,
            message: "请输入验证码！",
            trigger: "onBlur",
          },
          {
            pattern: /\d{6}$/,
            message: "请输入正确的验证码！",
            trigger: "onBlur",
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: "onBlur",
          },
          {
            validator: (value, rule) => {
              const { confirmPassword } = this.user
              if(confirmPassword && value !== password) return false
            },
            message: '两次输入的密码不一致',
            trigger: 'onBlur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'onBlur'
          },
          {
            validator: (value, rule) => {
              const { password } = this.user
              if(password && value !== password) return false
            },
            message: '两次输入的密码不一致',
            trigger: 'onBlur'
          }
        ]
      },
      isCount: false,
      isloading: false,
      showPasswordIcon1: false,
      showPasswordIcon2: false
    };
  },
  methods: {
    showPassword(type) {
      this[`showPasswordIcon${type}`] = !this[`showPasswordIcon${type}`]
    },
    loginMethod() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true, //禁止
        duration: 0,
      });
      let {phone, validCode, password, recommendUid} = this.user
      regist({phone, validCode, password, recommendUid}).then(res => {
        Toast.success('注册成功')
        this.$store.dispatch("setUser", data.data);
        this.$store.dispatch('token')
        this.$router.push(this.$route.query.redirect || "/");
      }).catch(err => {
        Toast.fail(err.desc)
      })
    },
    async onLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true, //禁止
        duration: 0,
      });
      try {
        const { data } = await login(this.user);
        Toast.success("登录成功！");
        this.$store.dispatch("setUser", data.data);

        // 跳转之前 清除页面缓存
        this.$store.commit("REMOVECACHEPAGE", "layout");

        // this.$router.back();
        // 跳转回原来的页面
        this.$router.push(this.$route.query.redirect || "/");
      } catch (error) {
        console.log(error);
        Toast.fail("登录失败！");
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },
    onSendsms() {
      let params = {
        phone: this.user.phone,
        type: 0,
      }
      this.isCount = true;
      sendCode(params).then(res => {
        if(res.status === 1000) {
        }
      })
      // 校验手机号之后再进行发送
      // try {
      //   await this.$refs["login-form"].validate("phone");
      //   // 验证通过
      //   await sendSms(this.user.phone);
      //   this.isCount = true;
      // } catch (error) {
      //   let msg = "";
      //   // 进行错误的判断
      //   if (error && error.response && error.response.status == 429) {
      //     msg = "发送太频繁了请稍后重试";
      //   } else if (error.name == "phone") {
      //     msg = error.message;
      //   } else if (error.response.status == 404) {
      //     msg = "手机号错误，请重新尝试";
      //   } else {
      //     msg = "未知错误，请重新尝试";
      //   }
      //   this.$toast({
      //     message: msg,
      //     position: "top",
      //   });
      // }
      // // 让button关闭loading
      // this.isloading = false;
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
        if(vm.$store.state.user){
          Toast('你已经登陆过了~');
          next(from)
        }else{
            return true;
        }
    })
  }
};
</script>

<style scoped lang="less">
.login-page {
  padding-top: 180px;
  height: 100vh;
  background-image: linear-gradient(#87aefb, #aac4ff);
  .logo {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
  .form-item {
    margin: 0 auto 15px;
    width: 80%;
    background-color: #7b9ceb;
    color: #f4f4f480;
    border-radius: 5px;
    /deep/.van-field__control {
      color: #f5f7f9;
    }
    /deep/.van-field__left-icon,
    /deep/.van-field__right-icon {
      color: #eaeff3;
    }
    /deep/.van-field__left-icon {
      margin-right: 15px;
    }
  }
  .form-item-img {
    /deep/.van-field__right-icon {
      position: relative;
      width: 100px;
    }
    /deep/.van-image {
      width: 100px;
      height: 20px;
      position: absolute;
      top: -9px;
      left: 14px;
    }
  }
}
.countDown {
  color: #f5f7f9;
}
.login-btn-container {
  width: 80%;
  margin: 0 auto;
  button {
    border-radius: 5px;
  }
}
.download {
  color: #f5f7f9b3;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

</style>