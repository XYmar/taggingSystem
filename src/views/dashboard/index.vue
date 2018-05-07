<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import adminDashboard from './admin'
  import editorDashboard from './editor'
  import { getCookies } from '../../main'

  export default {
    name: 'dashboard',
    components: { adminDashboard, editorDashboard },
    data() {
      return {
        currentRole: 'adminDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      let loginName = getCookies('username')
      console.log(this.roles, 'roles')
      /*if (!this.roles.includes('admin')) {
        this.currentRole = 'editorDashboard'
      }*/
      if (loginName != 'admin' ) {
        this.currentRole = 'editorDashboard'
      }
    }
  }
</script>
