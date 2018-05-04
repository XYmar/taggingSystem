<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="searchQuery">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>

      <el-button class="filter-item pull-right" style="float: right;margin-left: 10px;" @click="handleApply" type="primary"
                 icon="el-icon-plus">申请标注
      </el-button>
    </div>

    <el-table :key='tableKey' :data="listA" v-loading="listLoading" element-loading-text="请先申请标注" border fit highlight-current-row
              style="width: 100%">

      <el-table-column label="标题" min-width="100">
        <template slot-scope="scope">
          <router-link class="titleHover" :to='{name:"Tag",params:{id:scope.row.id}}'>{{scope.row.title}}</router-link>
          <!--<span>{{scope.row.title}}</span>-->
        </template>
      </el-table-column>
      <el-table-column width="150px" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="标注">
        <template slot-scope="scope">
          <span class="el-tag el-tag--success"  v-if="scope.row.marked">已标注</span>
          <span class="el-tag el-tag--danger" v-else>未标注</span>
        </template>
      </el-table-column>

    </el-table>

    <!--<div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>-->

    <el-dialog title="申请标注" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="申请数量: " prop="num">
          <el-input v-model="temp.num" style="width: 200px"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="ApplyDoc">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { documentList, docDistribution } from '@/api/tagdocument'
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
          create: '申请标注'
        },
        temp: {
          id: '',
          num: ''
        },
      }
    },
    created() {
      // this.getList()
    },
    methods: {
      /*getList() {
        this.listLoading = true
        documentList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice()
        })
      },*/
      handleSizeChange(val) {
        this.listQuery.limit = val
        // this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
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

            docDistribution(formData).then(response => {

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
          console.log(item)
          return item.title.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>

<style scoped>
  .titleHover:hover {
    background: rgba(31, 26, 233, 0.34);
  }
</style>
