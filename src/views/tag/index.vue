<template>
  <div class="app-container calendar-list-container">
    <h1>哈哈哈哈！！！！</h1>

  </div>
</template>

<script>
  import { documentList } from '@/api/tagdocument'
  /* eslint-disable */
  export default {
    name: 'tag',
    data() {
      return {

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
          this.newList = this.oldList.slice()
        })
      }
    }
  }
</script>

<style scoped>
</style>
