<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
             class="card-box login-form">
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="pwdType" v-model="loginForm.password" autoComplete="on"
                  placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item prop="againPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="pwdConfirmType" v-model="loginForm.againPassword" @keyup.enter.native="registerUser" autoComplete="on"
                  placeholder="请再次输入密码" />
        <span class="show-pwd" @click="confirmPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="registerUser">
          注册
        </el-button>
      </el-form-item>
      <div class="register-container">
        <span class="register-tips">已有账号？</span>
        <span class="register-btn" @click="jumpToLogin">登录</span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { isvalidUsername, isvalidConfirmPass } from '@/utils/validate'
  import { addUser } from '../../api/user'

  /* eslint-disable */
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      };
      const validateConfirmPass = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请再次输入密码'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          againPassword: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          againPassword: [{required: true, trigger: 'blur', validator: validateConfirmPass}]
        },
        loading: false,
        pwdType: 'password',
        pwdConfirmType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      confirmPwd() {
        if (this.pwdConfirmType === 'password') {
          this.pwdConfirmType = ''
        } else {
          this.pwdConfirmType = 'password'
        }
      },
      jumpToLogin() {
        this.$router.replace('/login')
      },
      registerUser: function() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            console.log(this.loginForm.password);
            console.log(this.loginForm.againPassword);
            if(this.loginForm.password !== this.loginForm.againPassword){
              this.$message({
                message: '两次密码不一致',
                type: 'error'
              });
            }else{
              const qs = require('qs');
              let data0 = {
                'username': this.loginForm.username,
                'password': this.loginForm.password
              };
              let data = qs.stringify(data0);
              console.log("0");
              addUser(data).then((res) => {
                console.log("A");
                this.$notify({
                  title: '成功',
                  message: '注册成功',
                  type: 'success',
                  duration: 2000
                })
                console.log("B");
                this.$router.replace('/login')
              })
            }


          }else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .register-container {
    text-align: center;
    font-size: 14px;
    color: $light_gray;
    .register-tips {
      margin-right: 4px;
    }
    .register-btn {
      color: #36a3f7;
      cursor: pointer;
    }
  }
  }
</style>
