<template>
  <div class="login-page">
    <van-image class="logo" round width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    <van-tabs
      background="#7b9ceb"
      line-width="50%"
      title-active-color="#eaeff3"
      title-inactive-color="#323233"
      line-height="0"
      v-model="loginWay"
    >
      <van-tab title="账号密码登录" :name="1"></van-tab>
      <van-tab title="验证码登录" :name="2"></van-tab>
    </van-tabs>
    <van-form validate-first @failed="onFailed" ref="loginForm">
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
        v-if="loginWay === 1"
        class="form-item"
        name="password"
        left-icon="lock"
        placeholder="密码"
        v-model="user.password"
        :type="showPasswordIcon ? 'text' : 'password'"
        :rules="formRules.password"
      >
        <van-icon
          slot="right-icon"
          :name="showPasswordIcon ? 'eye-o' : 'closed-eye'"
          @click="showPassword"
        />
      </van-field>
      <van-field
        v-else
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
            :time="1000 * 60"
          />
          <span v-if="!isCount" @click.prevent="onSendsms">取验证码</span>
        </span>
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
  </div>
</template>

<script>
import { login, sendCode, loginByCode } from '@/request/api'
import { Toast } from 'vant';
export default {
  name: 'login',
  data() {
    return {
      loginWay: 1,
      showPasswordIcon: false,
      isCount: false,
      user: {
        phone: '',
        password: '',
        validCode: ''
      },
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
          }
        ],
        password: [
        {
            required: true,
            message: '请输入密码',
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
            pattern: /\d{4}$/,
            message: "请输入正确的验证码！",
            trigger: "onBlur",
          },
        ],
      },
    }
  },
  methods: {
    showPassword() {
      this.showPasswordIcon = !this.showPasswordIcon
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },
    loginMethod() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      let {phone, validCode, password} = this.user
      let parmas = {phone, validCode, password, type: 0}
      if(this.loginWay === 1) {
        login(parmas).then(res => {
          this.setUserInfo(res)
        }).catch(err => {
          Toast.fail(err.desc || '系统错误')
        })
      } else {
        loginByCode(parmas).then(res => {
          this.setUserInfo(res)
        }).catch(err => {
          Toast.fail(err.desc || '系统错误')
        })
      }
    },
    setUserInfo(res) {
      Toast.success('登录成功')
      // this.$store.dispatch("setUser", res.data);
      const {token, uid} = res.data
      this.$store.dispatch('setToken', token)
      this.$store.dispatch('setUid', uid)
      this.$router.push(this.$route.query.redirect || "/");
    },
    async onSendsms() {
      try {
        await this.$refs.loginForm.validate("phone");
        let params = {
          phone: this.user.phone,
          type: 0,
        }
        this.isCount = true;
        await sendCode(params).then(() => {
          Toast.success('发送成功')
        }).catch(err => {
          Toast.fail(err.desc || '系统错误')
        })
      } catch(error) {
          let msg = "";
          if (error.name == "phone") {
            msg = error.message;
          }  else {
            msg = "未知错误，请重新尝试";
          }
          Toast.fail(msg || '系统错误')
      }
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
        if(vm.$store.state.token){
          Toast('你已经登陆过了~');
          next(from)
        }else{
            return true;
        }
    })
  }
}
</script>

<style lang="less" scoped>
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
  /deep/.van-tabs {
    width: 80%;
    margin: 0 auto 15px;
    .van-tabs__wrap {
      border-radius: 5px;
    }
  }
  /deep/.van-cell::after {
    display: none;
  }
  /deep/.van-form {
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
    .form-item {
      margin-bottom: 15px;
      border-radius: 5px;
      background-color: #7b9ceb;
      color: #f4f4f480;
    }
    .van-field__control {
      color: #f5f7f9;
    }
    .van-field__left-icon,
    .van-field__right-icon {
      color: #eaeff3;
    }
    .van-field__left-icon {
      margin-right: 15px;
    }
  }
  .login-btn-container {
    width: 80%;
    margin: 0 auto;
    button {
      border-radius: 5px;
    }
  }
}
</style>