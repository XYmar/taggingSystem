<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="userNameContainer">
      {{token}}
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="./avatar.jpg">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <el-upload class="upload-demo"
                     action=""
                     :file-list="fileList"
                     :httpRequest="uploadCom"
                     :show-file-list="false"
                     multiple>

            <span style="display:block;">导入</span>

          </el-upload>

        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;">导出</span>
        </el-dropdown-item>

        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { importDocu } from '@/api/tagdocument'
import { Loading } from 'element-ui';

/* eslint-disable */
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'token'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    uploadCom: function (file) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      let formData = new FormData();

      console.log("导入组件文件----------");
      console.log(file);

      formData.append('file', file.file);

      importDocu(formData).then(() => {
        setTimeout(() => {
          loading.close();
        }, 2000);

        this.$notify({
          title: '成功',
          message: '导入成功',
          type: 'success',
          duration: 2000
        })

      })
        .catch(err => {
          console.log(err);
        })
    },
    logout() {
      /* this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })*/
      this.$store.dispatch('FedLogOut').then(() => {
        this.$router.replace({ path: '/login' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .userNameContainer {
    position:absolute;
    display:inline-block;
    right: 75px;
    width:60px;
    text-align: center;
    font-size: 14px;
    color: #97a8be;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

