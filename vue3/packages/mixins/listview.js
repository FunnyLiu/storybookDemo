/**
 * listview相关mixin
 */
export default {
  data() {
    return {
      total: 0,
      loading: false,
      filters: [],
      columns: [],
      list: [],
      params: {
        pageSize: 10,
        pageIndex: 1
      }
    }
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    // 内置的一些filter
    getInnerFilter(key) {
      const innerFilters = {
        clear: {
          type: 'button',
          id: 'clear',
          name: '清除'
        },
        refresh: {
          type: 'primary',
          id: 'refresh',
          plain: true,
          icon: 'el-icon-refresh',
          name: '刷新',
          wrapStyle: {
            float: 'right'
          }
        }
      }
      return innerFilters[key]
    },
    // 内置的一些表格列
    getInnerColumn(key, params) {
      const innerColumns = {
        selection: { prop: '', type: 'selection', width: 55 }
      }
      return innerColumns[key]
    },
    // 内置的一些action操作
    getInnerActionHandler(key, params) {
      const innerActionHandlers = {
        clear() {
          this.$refs.list.resetFilter()
          this.params = this.$refs.list.getParams()
          this.getList()
        },
        // local模式下的clear
        clearLocal() {
          this.$refs.list.resetFilter()
          this.params = this.$refs.list.getParams()
          this.$refs.list.changeData({
            params: this.params
          })
        },
        // 无限列表下的清空
        clearInfinite() {
          this.$refs.list.resetFilter()
          this.list = []
          this.$refs.list.reset()
        },
        refresh() {
          this.params = this.$refs.list.getParams()
          this.getList()
        },
        // 无限列表下的刷新
        refreshInfinite() {
          this.list = []
          this.$refs.list.reset()
        },
        async loadMore(params) {
          this.params = this.$refs.list.getParams()
          await this.getList(params)
        },
        change(params) {
          this.params = params
          this.getList()
        },
        changeInfinite(params) {
          this.params = params
          this.list = []
          this.$refs.list.reset()
        }
      }
      return innerActionHandlers[key].bind(this, params)
    }
  }
}
