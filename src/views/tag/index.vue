<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.tagname">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">

      <el-table-column label="标题" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
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

  </div>
</template>

<script>
  import { documentList } from '@/api/tagdocument'
  import waves from '@/directive/waves' // 水波纹指令
  /* eslint-disable */
  export default {
    name: 'tag',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          tagname: ''
        },
        sortable: null,
        oldList: [],
        newList: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        documentList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice();
          this.$nextTick(() => {
            this.setSort()
          })
        })
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      setSort() {
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            const targetRow = this.list.splice(evt.oldIndex, 1)[0]
            this.list.splice(evt.newIndex, 0, targetRow)
            // for show the changes, you can delete in you code
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
            this.newList.splice(evt.newIndex, 0, tempIndex)
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
