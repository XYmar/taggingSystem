<template>
  <div>
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
            <el-dropdown-item style="padding:0 15px">
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item style="padding:0">
            <el-upload class="upload-demo"
                       action=""
                       :file-list="fileList"
                       :httpRequest="uploadCom"
                       :show-file-list="false"
                       multiple>

              <span style="display:block;padding: 0 15px;width:86px;text-align:left">导入</span>

            </el-upload>

          </el-dropdown-item>
          <el-dropdown-item style="padding:0">
            <span style="display:block;padding: 0 15px;" @click="outputVisible = true">导出</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided>
             <span @click="dialogFormVisible = true" style="display:block;">修改密码</span>
           </el-dropdown-item>-->
          <el-dropdown-item style="padding:0">
            <span @click="logout" style="display:block;padding: 0 15px;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dialog title="导出选项" :visible.sync="outputVisible">
          <el-form :model="form" style="width: 400px; margin-left:50px;">
            <el-form-item label="文件类型" :label-width="formLabelWidth">
              <el-select style="width:300px" v-model="value">
                <el-option v-for="item in fileTypeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="startIndex" :label-width="formLabelWidth">
              <el-input v-model="startIndex" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="endIndex" :label-width="formLabelWidth">
              <el-input v-model="endIndex" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outputVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleOutput">确 定</el-button>
          </div>
        </el-dialog>
        <!--<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form" style="width: 400px; margin-left:50px;">
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input type="password" v-model="form.passwordOld" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input type="password" v-model="form.passwordNew" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" :label-width="formLabelWidth">
              <el-input type="password" v-model="form.passwordNew" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleUpdate">确 定</el-button>
          </div>
        </el-dialog>-->
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { importDocu } from '@/api/tagdocument'
/* import { Loading } from 'element-ui'*/

/* eslint-disable */
export default {
  data() {
    /* const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }*/
    return {
      outputVisible: false,
      form: {
        passwordOld: '',
        passwordNew: ''
      },
      startIndex:0,
      endIndex:0,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      fileList: [],
      fileTypeOptions: [
        {
          value: 'json',
          label: 'JSON'
        },
        {
          value: 'xml',
          label: 'XML'
        }
      ],
      value: ''
    }
  },
  components: {
    Breadcrumb,
    Hamburger
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
        window.location.reload()
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
    handleOutput () {
    },
    logout() {
      /* this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })*/
      this.$store.dispatch('FedLogOut').then(() => {
        this.$router.replace({ path: '/login' })
      })
    },
    handleUpdate() {
      /* const passwordCookie = this.getCookie('password')*/
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

