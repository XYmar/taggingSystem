<template>
  <div class="app-container calendar-list-container" v-if="loginInfo.username != 'admin'">
    <div class="noticeContainer" style="text-align: center">
      <h3>
        对不起,您没有权限!
      </h3>
    </div>
  </div>
  <div v-else class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="searchQuery">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>

<!--      <el-button class="filter-item pull-right" style="float: right;margin-left: 10px;" @click="handleApply" type="primary"
                 icon="el-icon-plus">申请冲突标注
      </el-button>-->
    </div>

    <el-table :key='tableKey' :data="listA.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="listLoading" element-loading-text="请稍等" border fit highlight-current-row
              style="width: 100%">

      <el-table-column label="标题" min-width="100">
        <template slot-scope="scope">
          <router-link class="titleHover" :to='{name:"ConflictDetails",params:{id:scope.row.documentEntity.id,cId:scope.row.id}}'>{{scope.row.documentEntity.title}}</router-link>
          <!--<span>{{scope.row.title}}</span>-->
        </template>
      </el-table-column>
      <el-table-column width="150px" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="标注" prop="marked"
                       :filters="[{ text: '已标注', value: true }, { text: '未标注', value: false }]"
                       :filter-method="filterTag">
        <template slot-scope="scope">
          <span class="el-tag el-tag--success" v-if="scope.row.marked">已标注</span>
          <span class="el-tag el-tag--danger" v-else>未标注</span>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-dialog title="申请冲突标注" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="申请数量: " prop="num">
          <el-input v-model="temp.num" style="width: 200px"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="ApplyDoc">确认</el-button>
      </div>
    </el-dialog>-->
    <div class="paginationContainer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listA.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { documentList, docDistribution } from '@/api/tagdocument'
  import { conflictList } from '../../api/conflicts'
  import waves from '@/directive/waves' // 水波纹指令
  /* eslint-disable */
  export default {
    name: 'document',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 5,
          tagname: ''
        },
        sortable: null,
        oldList: [],
        newList: [],
        searchQuery: '',
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create: '申请冲突标注'
        },
        temp: {
          id: '',
          num: ''
        },
        loginInfo: {
          username: '',
          password: ''
        },
        total:0,//默认数据总数
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
      }
    },
    created() {
      this.loginInfo.username = this.getCookie('username')
      this.loginInfo.password = this.getCookie('password')
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        conflictList(this.listQuery,this.loginInfo).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice()
        })
      },
      filterTag(value, row) {
        console.log(row.marked);
        console.log(value);
        return row.marked === value;
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.pagesize = val
        // this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.currentPage = val
        // this.getList()
      },
      resetTemp() {
        this.temp = {
          id: '',
          num: ''
        }
      },
      handleApply() {
        this.resetTemp();
        this.dialogStatus = 'create'
        this.dialogFormVisible = true

        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          // this.getList()
        })
      },
      ApplyDoc() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append('num', this.temp.num);

            //console.log(formData);

            docDistribution(formData, this.loginInfo).then(response => {

              this.list = response.data.data;
              //console.log(response.data)
              console.log(response.data.data)
              //this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.listLoading = false
              this.$notify({
                title: '成功',
                message: '申请成功',
                type: 'success',
                duration: 2000
              })

              this.getList()


            })
          }
        })
      },
      handleFilter() {
        this.listQuery.page = 1;
        // this.getList()
      }
    },
    computed: {
      listA: function () {
        let self = this;
        return self.list.filter(function (item) {
          /* console.log(item) */
          return item.documentEntity.title.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>

<style scoped>
  .titleHover:hover {
    background: rgba(31, 26, 233, 0.34);
  }
  .paginationContainer {
    text-align: center;
    padding: 20px 10px;
  }
</style>
